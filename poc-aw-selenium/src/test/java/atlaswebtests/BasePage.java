package atlaswebtests;

import org.openqa.selenium.WebDriver;

public class BasePage {
	protected WebDriver driver;
	
	public BasePage(WebDriver driver) {
		this.driver = driver;
	}
	
	public RemitPage navigateTo() {
		driver.navigate().to("https://atlas-web-dev.app.dev-west.paas.mckesson.com/accesshealth/voStatementScreen.do?smoSessionId=325c14531c0009021f0b3837090c5307125f0e5f345c085");
		return new RemitPage(driver);
	}

}
