import * as path from "path";
import * as fs from "fs";

module.exports = function ($platformsData, $testExecutionService) {
	if($testExecutionService && $testExecutionService.platform) {
		let platformData = $platformsData.getPlatformData($testExecutionService.platform),
			projectFilesPath = path.join(platformData.appDestinationDirectoryPath, "app"),
			packageJsonPath = path.join(projectFilesPath, 'package.json'),
			packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

		// When test command is used in ns-cli, we should change the entry point of the application
		packageJson.main = "./tns_modules/nativescript-unit-test-runner-essent/app.js";
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
	}
}
