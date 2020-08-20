package atlaswebtests;

import cucumber.api.java.Before;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

import static org.junit.Assert.*;

import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Stepdefs {
	WebDriver driver;
	String date1 = "";
	String date2 = "";
	RemitPage remit;
	//RemitPage remitPage;
	//RemitPageTests remitPageTests = new RemitPageTests();
	
	
	@Before
	public void setItUp() {
		//remitPageTests.setup();
		//remitPageTests.goToRemitPage();
		driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		remit = new RemitPage(driver);
	}
	
	@Given("I have Selenium installed")
	public void i_have_Selenium_installed() {
		//remitPageTests.setup();
		//RemitPage remit = new RemitPage(driver);
		//remit.enterPaymentStartDate(date1);
		//remit = new RemitPage(driver);
		
	}

	@When("I go to the Consolidated Remittance Statement page")
	public void i_go_to_the_Consolidated_Remittance_Statement_page() {
	    //remitPageTests.goToRemitPage();
		//RemitPage remit = new RemitPage(driver);
		//remitPage.enterPaymentStartDate(date1);
		//remit.enterPaymentStartDate(date1);
		remit.navigateTo();
	}

	@Then("I have the option to retrieve a remittance report")
	public void i_have_the_option_to_retrieve_a_remittance_report() {
		//remitPage.enterPaymentEndDate(date2);
		//remit.enterPaymentEndDate(date2);
		Assert.assertTrue(remit.downloadButton.isEnabled());
	}

	@Given("I am on the Consolidated Remittance Statement page")
	public void i_am_on_the_Consolidated_Remittance_Statement_page() {
	    //remitPageTests.setup();
	    //remitPageTests.goToRemitPage();
		//remit = new RemitPage(driver);
		remit.navigateTo();
	}

	@When("I check for the pharamcy name")
	public void i_check_for_the_pharamcy_name() {
	    //remitPageTests.verifyStoreName();
		//RemitPage remit = new RemitPage(driver);
		//remit.checkStoreName();
		remit.checkStoreName();
	}

	@Then("the name of the pharmacy is displayed")
	public void the_name_of_the_pharmacy_is_displayed() {
		Assert.assertTrue(remit.pharmacyName.isDisplayed());
	}

	@When("I check for the store's NCPDP number")
	public void i_check_for_the_store_s_NCPDP_number() {
		//remitPageTests.verifyStoreName();
		//RemitPage remit = new RemitPage(driver);
		//remit.ncpdpNumber.isDisplayed();
		remit.checkStoreName();
	}

	@Then("the NCPDP number is displayed")
	public void the_NCPDP_number_is_displayed() {
		Assert.assertTrue(remit.ncpdpNumber.isDisplayed());
	}

	@When("I click the payment dropdown")
	public void i_click_the_payment_dropdown() {
	    //remitPageTests.selectPaymentFromDropdown();
		//RemitPage remit = new RemitPage(driver);
		//remit.paymentDropDown();
		remit.paymentDropDown();
	}

	@Then("I can select a payment from the list")
	public void i_can_select_a_payment_from_the_list() {
		
	}

	@Given("I have not selected a payment")
	public void i_have_not_selected_a_payment() {
		//remitPageTests.setup();
		//remit = new RemitPage(driver);
	}

	@When("I go to choose a date range")
	public void i_go_to_choose_a_date_range() {
		
	}

	@Then("I can select a begin date")
	public void i_can_select_a_begin_date() {
		//remitPageTests.enterStartDate();
		//RemitPage remit = new RemitPage(driver);
		//remit.enterPaymentStartDate(date1);
		//remit.enterPaymentEndDate(date2);
		remit.enterPaymentStartDate(date1);
	}

	@Then("I can select a end date")
	public void i_can_select_a_end_date() {
		//remitPageTests.enterEndDate();
		remit.enterPaymentEndDate(date2);
	}

	@Given("I have selected a payment from the dropdown")
	public void i_have_selected_a_payment_from_the_dropdown() {
		//RemitPage remit = new RemitPage(driver);
		//remit.paymentDropDown();
		//remit.clickOnDownloadButton();
		//remit = new RemitPage(driver);
		remit.navigateTo();
		remit.paymentDropDown();
	}

	@When("I click the download button")
	public void i_click_the_download_button() {
		remit.clickOnDownloadButton();
	}

	@Then("that statement is downloaded")
	public void that_statement_is_downloaded() {
		
	}

	@Given("I have inputed a valid begin payment date")
	public void i_have_inputed_a_valid_begin_payment_date() {
		//remit = new RemitPage(driver);
		remit.navigateTo();
		remit.enterPaymentStartDate(date1);
	}

	@Given("I have inputed a valid end payment date")
	public void i_have_inputed_a_valid_end_payment_date() {
		remit.enterPaymentEndDate(date2);
	}

	@When("I select the PDF button")
	public void i_select_the_PDF_button() {
		//RemitPage remit = new RemitPage(driver);
		//remit.enterPaymentStartDate(date1);
		//remit.enterPaymentEndDate(date2);
		//remit.selectPDFbutton();
		//remit.clickOnDownloadButton();
		remit.selectPDFbutton();
	}

	@Then("that statement is downloaded as a PDF")
	public void that_statement_is_downloaded_as_a_PDF() {
		
	}

}
