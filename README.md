# Proton-authenticator to Bitwarden-autenticator

Just a quick script to convert your `proton-codes.json` export into a different Bitwarden like shema.

### Prerequisites
* **Node.js** (On Linux you may use nvm to install).

### How to run it
1.  Drop your **proton-codes.json** file into this folder.
2.  Open your terminal and run:
    ```bash
    node convert.js
    ```

### The Result
You'll get a file called **converted.json** in the same directory. Import this file into your bitwarden authenticator

> **Note:** This extracts the username from the `otpauth` URI. Sometimes names get a bit scrambled (Known Issue)
