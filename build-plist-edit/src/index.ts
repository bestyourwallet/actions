const core = require("@actions/core");
import { getAppInfoPlistAsync, setAppInfoPlistAsync } from "./plist";

async function main() {
  const input_version_code = core.getInput("buildNumber", {
    required: true,
  });
  const input_version_name = core.getInput("versionName", {
    required: true,
  });
  const project_name = core.getInput("projectName");
  const project_path = core.getInput("dir");

  if (!project_path) return;

  console.log(`\n========== build-plist-edit ==========`);
  console.log(`Project: ${project_name}`);
  console.log(`Dir: ${project_path}`);
  console.log(`Input versionName (CFBundleShortVersionString): ${input_version_name}`);
  console.log(`Input buildNumber (CFBundleVersion): ${input_version_code}`);

  let infoPlist = await getAppInfoPlistAsync(project_path, project_name);

  console.log(`\n[BEFORE] CFBundleShortVersionString: ${infoPlist["CFBundleShortVersionString"]}`);
  console.log(`[BEFORE] CFBundleVersion: ${infoPlist["CFBundleVersion"]}`);

  infoPlist["CFBundleVersion"] = input_version_code;
  infoPlist["CFBundleShortVersionString"] = input_version_name;

  await setAppInfoPlistAsync(project_path, project_name, infoPlist);

  // Verify by reading back
  const verifyPlist = await getAppInfoPlistAsync(project_path, project_name);
  console.log(`\n[AFTER] CFBundleShortVersionString: ${verifyPlist["CFBundleShortVersionString"]}`);
  console.log(`[AFTER] CFBundleVersion: ${verifyPlist["CFBundleVersion"]}`);
  console.log(`========== build-plist-edit done ==========\n`);
}

main().catch((err) => {
  console.error(`build-plist-edit FAILED for project:`, err);
  process.exit(1);
});