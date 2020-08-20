package atlaswebtests;

import java.util.concurrent.TimeUnit;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class RemitPageTests {
	static WebDriver driver;
	String date1 = "";
	String date2 = "";
	
	@Before
	public void setup() {
		driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);	
	}
	
	//@AfterClass
	//public static void close() {
	//	driver.quit();
	//}
	
	@Test
	public void enterStartDate() {
		RemitPage remit = new RemitPage(driver);
		remit.enterPaymentStartDate(date1);
	}
	
	@Test
	public void enterEndDate() {
		RemitPage remit = new RemitPage(driver);
		remit.enterPaymentEndDate(date2);
	}
	
	@Test
	public void downloadRemitStatement() {
		RemitPage remit = new RemitPage(driver);
		remit.clickOnDownloadButton();
	}
	
	@Test
	public void selectPDF() {
		RemitPage remit = new RemitPage(driver);
		remit.selectPDFbutton();
	}
	
	@Test
	public void downloadThreeMonthStatement() {
		RemitPage remit = new RemitPage(driver);
		remit.fullDownload(date1, date2);
	}
	
	@Test
	public void verifyStoreName() {
		RemitPage remit = new RemitPage(driver);
		remit.checkStoreName();
	}
	
	@Test
	public void selectPaymentFromDropdown() {
		RemitPage remit = new RemitPage(driver);
		remit.paymentDropDown();
	}
	
	@Test
	public void goToRemitPage() {
		RemitPage remit = new RemitPage(driver);
	}
	
}
