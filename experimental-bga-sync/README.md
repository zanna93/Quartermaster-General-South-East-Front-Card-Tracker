# Experimental BGA Sync

This is a local proof of concept, not a release feature. It reads only log nodes already visible in an open BGA table and stores the captured events locally in the browser extension.

## Install for the test

1. Open `chrome://extensions` or `edge://extensions`.
2. Enable Developer mode and choose **Load unpacked**.
3. Select this `experimental-bga-sync` folder.
4. In the extension details, enable **Allow access to file URLs** when opening the tracker directly as `file://`.
5. Keep the BGA table and the tracker open in the same Chrome or Edge profile. An embedded app browser cannot load this unpacked companion.

## Test flow

1. In the tracker, click the gold star beside the title five times to reveal **Sync**.
2. Open Sync, enter the BGA table code, and choose **Connect**.
3. Play a new action on BGA, then return to the tracker and choose **Refresh**.
4. Review the detected cards before choosing **Apply changes**.

## Important limits

- The BGA page can show only a limited log window. Existing entries are stored as a diagnostic snapshot and are never used to reset tracker cards.
- Live coverage starts only after the extension has connected to the open BGA table. Events observed from that point are retained locally, even after they scroll out of BGA's visible log.
- The proof currently matches card names found in visible log text, labels, image alt text, titles, or filenames. The first real test tells us which BGA attributes are available for reliable card identification.
- An undo is recognized as an event. A card is restored automatically only when BGA marks that same card log node as reverted; a generic undo notice alone does not guess which card changed.
- Do not distribute or rely on this automation until its compatibility with BGA's rules has been confirmed.
