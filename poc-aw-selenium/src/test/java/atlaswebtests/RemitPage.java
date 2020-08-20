package atlaswebtests;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class RemitPage extends BasePage {
	public RemitPage(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver, this);
	}
	
	//private WebDriver driver;
	private WebDriverWait wait;
	private LocalDate currentDate = LocalDate.now();
	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
	
	//private static String PAGE_URL = "https://atlas-web-dev.app.dev-west.paas.mckesson.com/accesshealth/voStatementScreen.do?smoSessionId=325c14531c0009021f0b3837090c5307125f0e5f345c085";
	
	@FindBy(xpath = "/html/body/app-root/core-navbar/mat-card/div/div/div/app-central-pay/div/mat-card[1]/mat-card-actions/mck-download-button-accent/button")
	WebElement downloadButton;
	
	@FindBy(xpath = "/html/body/app-root/core-navbar/mat-card/div/div/div/app-central-pay/mat-toolbar/mat-toolbar-row/span[1]")
	WebElement pharmacyName;
	
	@FindBy(xpath = "/html/body/app-root/core-navbar/mat-card/div/div/div/app-central-pay/mat-toolbar/mat-toolbar-row/span[1]")
	WebElement ncpdpNumber;
	
	@FindBy(xpath = "/html/body/app-root/core-navbar/mat-card/div/div/div/app-central-pay/div/mat-card[1]/mat-form-field[1]")
	WebElement selectAPayment;
	
	@FindBy(xpath = "//*[@id=\"mat-option-1\"]")
	WebElement firstDropdownOption;
	
	@FindBy(xpath = "//*[@id=\"mat-input-0\"]")
	WebElement pickBeginDate; 
	
	@FindBy(xpath = "//*[@id=\"mat-input-1\"]")
	WebElement pickEndDate;
	
	@FindBy(xpath = "//*[@id=\"mat-radio-2\"]")
	WebElement csvButton;
	
	@FindBy(xpath = "//*[@id=\"mat-radio-3\"]")
	WebElement pdfButton;
	
	@FindBy(xpath = "/html/body/app-root/core-navbar/mat-card/div/div/div/app-central-pay/mat-toolbar/mat-toolbar-row/button")
	WebElement setStoreContextButton;
	
	//public RemitPage(WebDriver driver) {
	//	this.driver = driver;
	//	driver.get(PAGE_URL);
	//	PageFactory.initElements(driver, this);
	//}
	
	public void enterPaymentStartDate(String date1) {
		//pickBeginDate.sendKeys(date1);
		//LocalDate currentDate = LocalDate.now();
		//DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
		LocalDate pastDate = currentDate.minusDays(90);
		String minus90daysDate = new String(pastDate.format(formatter));
		pickBeginDate.sendKeys(minus90daysDate);
		
	}	
	
	public void clickOnDownloadButton() {
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(setStoreContextButton));
		downloadButton.click();
	}

	public void enterPaymentEndDate(String date2) {
		//pickEndDate.sendKeys(date2);
		//LocalDate currentDate = LocalDate.now();
		//DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
		String todayDate = new String(currentDate.format(formatter));
		pickEndDate.sendKeys(todayDate);
		
	}
	
	public void selectCSVbutton() {
		csvButton.click();
	}
	
	public void selectPDFbutton() {
		pdfButton.click();
	}

	public void fullDownload(String date1, String date2) {
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(setStoreContextButton));
		enterPaymentStartDate(date1);
		//pickBeginDate.sendKeys(date1);
		enterPaymentEndDate(date2);
		//pickEndDate.sendKeys(date2);
		pdfButton.click();
		csvButton.click();
		downloadButton.click();
	}

	public void checkStoreName() {
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(setStoreContextButton));
		pharmacyName.isDisplayed();
	}
	
	public void paymentDropDown() {
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(setStoreContextButton));
		selectAPayment.click();
		firstDropdownOption.click();
	}

}
