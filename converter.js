const fs = require("fs");

function convertFile() {
  const inputFile = "proton-codes.json";
  const outputFile = "converted.json";

  try {
    const rawData = fs.readFileSync(inputFile, "utf8");
    const sourceData = JSON.parse(rawData);

    const convertedData = {
      encrypted: false,
      items: sourceData.entries.map((entry) => {
        const uriString = entry.content.uri;
        let username = "";

        try {
          const url = new URL(uriString);
          const label = decodeURIComponent(url.pathname.replace(/^\//, ""));
          username = entry.content.name;
        } catch (e) {
          console.warn(`[Warning] Could not parse URI for ID: ${entry.id}`);
        }

        return {
          favorite: false,
          id: entry.id,
          login: {
            totp: uriString,
            username: username,
          },
          name: entry.content.name,
          type: 1,
        };
      }),
    };

    fs.writeFileSync(
      outputFile,
      JSON.stringify(convertedData, null, 2),
      "utf8",
    );
    console.log(
      `Successfully converted ${convertedData.items.length} items to ${outputFile}`,
    );
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(
        `Error: Could not find '${inputFile}'. Make sure the file is in the same folder as this script.`,
      );
    } else {
      console.error("An error occurred during conversion:", err.message);
    }
  }
}

convertFile();
