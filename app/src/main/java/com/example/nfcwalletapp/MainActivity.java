package com.example.nfcwalletapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.PendingIntent;
import android.content.Intent;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.MifareClassic;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "NfcWalletApp";
    private NfcAdapter nfcAdapter;
    private PendingIntent pendingIntent;
    private TextView cardInfoTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        cardInfoTextView = findViewById(R.id.cardInfoTextView);
        cardInfoTextView.setText("Scan a MIFARE Classic card...");

        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        if (nfcAdapter == null) {
            Toast.makeText(this, "NFC is not available on this device.", Toast.LENGTH_LONG).show();
            // finish(); // Consider finishing if NFC is essential
            return;
        }

        // Create a PendingIntent object so the Android system can populate it with the details of the tag when it is scanned.
        Intent intent = new Intent(this, getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_MUTABLE);

    }

    @Override
    protected void onResume() {
        super.onResume();
        if (nfcAdapter != null) {
            // Enable foreground dispatch to capture NFC intents
            nfcAdapter.enableForegroundDispatch(this, pendingIntent, null, new String[][]{new String[]{MifareClassic.class.getName()}});
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (nfcAdapter != null) {
            // Disable foreground dispatch when the activity is not in the foreground
            nfcAdapter.disableForegroundDispatch(this);
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent); // Store the new intent
        resolveIntent(intent);
    }

    private void resolveIntent(Intent intent) {
        String action = intent.getAction();

        if (NfcAdapter.ACTION_TECH_DISCOVERED.equals(action)) {
            Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            if (tag != null) {
                cardInfoTextView.setText("MIFARE Classic card detected!\nReading...");
                processMifareClassicTag(tag);
            } else {
                cardInfoTextView.setText("Error: Tag object is null.");
            }
        } else {
            Log.d(TAG, "Intent action not TECH_DISCOVERED: " + action);
            // Handle other actions if necessary
        }
    }

    private void processMifareClassicTag(Tag tag) {
        MifareClassic mfc = MifareClassic.get(tag);
        if (mfc == null) {
            cardInfoTextView.setText("Card is not MIFARE Classic compatible.");
            return;
        }

        StringBuilder cardData = new StringBuilder();
        cardData.append("Card Detected:\n");
        cardData.append("UID: ").append(bytesToHex(tag.getId())).append("\n");
        cardData.append("Type: MIFARE Classic\n");
        cardData.append("Sector Count: ").append(mfc.getSectorCount()).append("\n");
        cardData.append("Block Count: ").append(mfc.getBlockCount()).append("\n");
        cardData.append("Size: ").append(mfc.getSize()).append(" bytes\n\n");

        // --- Read specific data (Sector 1, Block 4) ---
        int sectorToRead = 1;
        int targetBlockIndex = 4; // Absolute block index for Sector 1, Block 0 (first data block)
        cardData.append("Attempting to read Sector ").append(sectorToRead).append(", Block ").append(targetBlockIndex).append(":\n");

        boolean auth = false;
        byte[] blockData = null;
        String readResult = "[Error - Check Logs]"; // Default message

        try {
            mfc.connect(); // Connect to the tag
            Log.d(TAG, "Connected to tag.");

            // Authenticate sector 1 with default key A
            // IMPORTANT: Use the correct key for your card. KEY_DEFAULT might not work.
            auth = mfc.authenticateSectorWithKeyA(sectorToRead, MifareClassic.KEY_DEFAULT);
            // Alternatively, try key B: auth = mfc.authenticateSectorWithKeyB(sectorToRead, MifareClassic.KEY_DEFAULT);
            // Or NFC Forum key: auth = mfc.authenticateSectorWithKeyA(sectorToRead, MifareClassic.KEY_NFC_FORUM);

            if (auth) {
                Log.d(TAG, "Sector " + sectorToRead + " authenticated successfully.");
                blockData = mfc.readBlock(targetBlockIndex);
                Log.d(TAG, "Block " + targetBlockIndex + " read successfully. Data: " + bytesToHex(blockData));

                // --- Step 3: Interpret the data ---
                String interpretedData = interpretBlockData(blockData);
                readResult = "Data (Hex): " + bytesToHex(blockData) + "\n" + interpretedData;
                // --- End Interpretation ---

            } else {
                Log.w(TAG, "Authentication failed for sector " + sectorToRead);
                readResult = "Authentication failed for Sector " + sectorToRead + ". Check keys.";
            }
        } catch (IOException e) {
            Log.e(TAG, "IOException while reading MIFARE Classic tag", e);
            readResult = "Error reading tag: " + e.getMessage();
        } finally {
            // Ensure the connection is closed
             if (mfc != null && mfc.isConnected()) { // Check mfc is not null and isConnected before closing
                 try {
                     mfc.close();
                     Log.d(TAG, "Disconnected from tag.");
                 } catch (IOException e) {
                     Log.e(TAG, "Error closing MifareClassic connection", e);
                 }
             }
        }
        cardData.append(readResult).append("\n");
        // --- End Reading Section ---

        cardInfoTextView.setText(cardData.toString()); // Set text AFTER reading attempt and close
    }

    // --- Step 3: Helper function to interpret block data ---
    private String interpretBlockData(byte[] data) {
        if (data == null || data.length < 4) { // Example: Check if data is sufficient for balance
            return "Interpreted Data: [Invalid or insufficient data]";
        }

        // Example Interpretation: Assume first 4 bytes are an integer balance (little-endian)
        // IMPORTANT: This is just an example. Adjust based on your actual data structure.
        try {
            // Ensure data has at least 4 bytes before accessing indices 0-3
            if (data.length >= 4) {
                int balanceValue = (data[3] & 0xFF) << 24 | (data[2] & 0xFF) << 16 | (data[1] & 0xFF) << 8 | (data[0] & 0xFF);
                // You could format this value as currency, etc.
                return String.format("Interpreted Data:\n - Example Balance: %d", balanceValue);
            } else {
                 return "Interpreted Data: [Data block too short for balance]";
            }
        } catch (Exception e) {
            Log.e(TAG, "Error interpreting block data", e);
            return "Interpreted Data: [Error during interpretation]";
        }
        // Add more interpretation logic here if needed (e.g., reading name from other bytes)
    }
    // --- End Helper Function ---

    // Utility function to convert byte array to hex string
    private String bytesToHex(byte[] bytes) {
        if (bytes == null) return "";
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02X", b));
        }
        return sb.toString();
    }
}
