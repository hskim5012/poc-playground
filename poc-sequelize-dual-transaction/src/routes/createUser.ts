import { Express, Router, Request, Response } from 'express';
import { PPBankingSequelize, PPReportsSequelize } from '../models/index';
import { Transaction, QueryTypes } from 'sequelize';
import * as moment from 'moment';

export const createUserController = (path: string, app: Express) => {
  let router = Router();

  app.use(path, router);

  router.post('/', async (req: Request, res: Response) => {
    let errors = [];
    let transaction;
    let ReportsTransaction;

    let mtin: number = req.body.mtin;
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let emailAddress: string = req.body.emailAddress;
    let userLoginId: string = req.body.userLoginId;
    let chains: Array<number> = req.body.chains;
    let accounts: Array<number> = req.body.accounts;

    let rawBindings = {
      userLoginId: userLoginId,
      US12EUSR: userLoginId,
      userName: firstName + ' ' + lastName,
      US12ENT: 1,
      account: 1,
      chain: 1,
      ownerId: mtin,
      emailAddress: emailAddress,
      createDate: 0,
      createTime: 0,
    };

    const now = moment();
    let createDate = now.format('YYYYMMDD');
    rawBindings.createDate = +createDate;
    let createTime = now.format('HHmmss');
    rawBindings.createTime = +createTime;

    const promises = [];

    try {
      transaction = await PPBankingSequelize.transaction();

      let bankingQuery =
        'INSERT INTO [USER_LOGIN]([USER_LOGIN_ID], [USER_NAME], [OWNER_ID], DATE_ACTIVATED, EMAIL_ADDRESS)' +
        'VALUES($userLoginId, $userName, $ownerId, GETDATE(), $emailAddress)';

      const a = await PPBankingSequelize.query(bankingQuery, {
        type: QueryTypes.INSERT,
        bind: rawBindings,
        transaction: transaction,
      });

      promises.push(a);
      //   console.log('resolving all promises');
      //   Promise.all(promises);
      //   await transaction.commit();
      //   console.log('we did it?');
    } catch (err) {
      console.log(err);
      //   if (transaction) {
      //     await transaction.rollback();
      return res.status(500).end();
    }

    try {
      ReportsTransaction = await PPReportsSequelize.transaction();

      const b = await insertUSM12(ReportsTransaction, rawBindings);
      promises.push(b);

      console.log('Insert entries per account into USM04');
      for (let i = 0; i < accounts.length; i++) {
        console.log('current account #', accounts[i]);
        rawBindings.account = accounts[i];
        let c = await insertUSM04(ReportsTransaction, rawBindings);
        promises.push(c);
      }

      console.log('Insert entries per chain into USM09');
      for (let i = 0; i < chains.length; i++) {
        console.log('current account #', chains[i]);
        rawBindings.chain = chains[i];
        const d = await insertUSM09(ReportsTransaction, rawBindings);
        promises.push(d);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).end();
    }

    Promise.all(promises).then(async () => {
      console.log('Starting transactions')
      await transaction.commit();
      await ReportsTransaction.commit();
    }).then(() => {
      console.log('no issues');
      return res.status(201).send('Created Successfully').end();
    }).catch((err) =>{
      console.log(err);
      return res.status(500).send('Internal Server Error').end();
    })

    console.log('did we do it?');


    // Promise.all(promises);
    // await transaction.commit();
    // await ReportsTransaction.commit();
    // console.log('did we do it?');

    // if (transaction.finished === 'commit' && ReportsTransaction.finished === 'commit') {
    //   return res.status(201).end();
    // }
  });
};

let insertUSM12 = async (txn: Transaction, rawBindings: any): Promise<any> => {
  return await new Promise<void>((resolve, reject) => {
    let bridgeQuery =
      'INSERT INTO [P2DTALIB].[USM12] ([US12ENT], [US12EUSR], [US12USR], [US12CDT], [US12CTM]) ' +
      'VALUES ($US12ENT, $userLoginId, $US12EUSR, $createDate, $createTime)';

    return PPReportsSequelize.query(bridgeQuery, {
      type: QueryTypes.INSERT,
      transaction: txn,
      bind: rawBindings,
    })
      .then((result: any) => {
        console.log(
          `Successfully created into USM12: ${rawBindings.userLoginId}`
        );
        resolve(result);
      })
      .catch((err) => {
        console.error(`encountered issue, exception: ${JSON.stringify(err)}}`);
        reject(err);
      });
  });
};

let insertUSM04 = async (txn: Transaction, rawBindings: any): Promise<any> => {
  return await new Promise<void>((resolve, reject) => {
    let accountsQuery =
      'INSERT INTO [P2DTALIB].[USM04]([US04USR], [US04TAX], [US04CRD]) ' +
      'VALUES ($userLoginId, $account, $createDate)';

    return PPReportsSequelize.query(accountsQuery, {
      type: QueryTypes.INSERT,
      transaction: txn,
      bind: rawBindings,
    })
      .then((result: any) => {
        console.log(
          `Successfully inserted into USM04 for account: ${rawBindings.account}`
        );
        resolve(result);
      })
      .catch((err) => {
        console.error(`encountered issue, exception: ${JSON.stringify(err)}}`);
        reject(err);
      });
  });
};

let insertUSM09 = async (txn: Transaction, rawBindings: any): Promise<any> => {
  return await new Promise<void>((resolve, reject) => {
    let chainsQuery =
      'INSERT INTO [P2DTALIB].[USM09]([US09USR], [US09GRP], [US09CRD]) ' +
      'VALUES ($userLoginId, $chain, $createDate)';

    return PPReportsSequelize.query(chainsQuery, {
      type: QueryTypes.INSERT,
      transaction: txn,
      bind: rawBindings,
    })
      .then((result: any) => {
        console.log(`Successfully inserted into USM04 for chain`);
        resolve(result);
      })
      .catch((err) => {
        console.error(`encountered issue, exception: ${JSON.stringify(err)}}`);
        reject(err);
      });
  });
};
