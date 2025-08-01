import { readdirSync } from "node:fs";
import { withAuth } from "@/src/server/utils/with-auth";

export async function getUploadedIcons(ignoreList?: string[]) {
	return withAuth(async () => {
		try {
			const files: [string, string][] = [];

			for (const file of readdirSync("public/images")) {
				if (ignoreList?.some((ignore) => file.startsWith(ignore))) {
					continue;
				}

				files.push([file, `/images/${file}`]);
			}

			return {
				success: true,
				icons: files,
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
				error: "Failed to get uploaded icons",
			};
		}
	});
}
