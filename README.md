# ⚔️ Quartermaster General: South Front — Card Tracker & Predictor

A lightweight, standalone web application designed as a real-time tactical companion for the two-player tabletop wargame **Quartermaster General: South Front** (by Ian Brody / Ares Games).

This tool tracks revealed cards, logs face-down discards, and calculates the exact **hypergeometric probability** of your opponent holding specific reaction cards in their hand—grouped strictly by Nation for maximum tactical accuracy.

---

## ✨ Features

* **🧮 Hypergeometric Probability Engine**  
  Calculates the exact percentage chance that your opponent currently holds at least one copy of a specific reaction card (*Stand Fast*, *Anti-Air*, *Sustain Attack*, *Advance!*, *Exchange*, etc.) based on their hand size and the remaining unknown card pool.

* **🏛️ Nation-Isolated Reaction Predictor**  
  In *Quartermaster General*, reaction cards can only defend or support forces of the matching nation. The predictor automatically segregates reaction probabilities into distinct national blocks:
  * 🇬🇧 **United Kingdom (UK)**
  * 🇺🇸 **United States (USA)**
  * 🇫🇷 **Free France**
  * 🇩🇪 **Germany**
  * 🇮🇹 **Pact (Italy)**

* **🎨 Physical Card Color Palette**  
  Built with a light theme matching the physical game components and faction colors:
  * 🇬🇧 **UK**: Warm Amber / Tan (`#fef3c7`)
  * 🇺🇸 **USA**: Military Olive Green (`#dcfce7`)
  * 🇫🇷 **Free France**: Pastel Royal Blue (`#dbeafe`)
  * 🇮🇹 **Patto (Italy)**: Light Ice Gray (`#f1f5f9`)
  * 🇩🇪 **Germany**: Dark Charcoal / Feldgrau (`#334155`) with high-contrast white text

* **📊 Live Opponent Counters**
  * **Opponent Hand Size (`-` / `+`)**: Dynamically adjust your opponent's current hand size to recalculate probabilities instantly.
  * **Face-Down Discards / Conscription (`-` / `+`)**: Log face-down discards (*Conscription*, *Forced March*, *Desperate Attack*, or card-driven blind discards). This reduces the unknown card pool without revealing hidden card identities.

* **🔒 Late War Era Locking & Smart Sorting**
  * **Late War Lock**: Late War cards display a dashed border, striped overlay, and a `🔒 LOCKED (Late War)` badge while in *Mid War* mode. Clicking a locked card prompts you to seamlessly enable *Late War* mode.
  * **Auto-Sorting**: Active deck cards remain at the top, locked Late War cards sit in the middle, and discarded/revealed cards automatically dim and slide to the bottom of the grid.

* **🔮 Collapsible Contingency Section**  
  Tracks the 3 physical double-sided Contingency cards (6 public effects) in a collapsible bottom section to save vertical screen space.

* **🚀 Standalone & Zero Setup**
  * Single-file HTML architecture requiring **zero installation**, zero dependencies, and **no internet connection**.
  * Card states and counter values auto-save in the browser's `LocalStorage`.

---

## 🛠️ How to Use

1. **Select Faction**: Choose **AXIS (Pact / Germany)** or **ALLIES (UK / USA / France)** from the top header.
2. **Set Opponent Hand Size**: Use the green counter in the sidebar to match how many cards your opponent currently holds.
3. **Track Revealed Cards**: Click **`Mark Discarded`** on any card played or revealed into the discard pile. It will dim and move to the bottom.
4. **Log Face-Down Discards**: When your opponent discards cards face-down (e.g., for *Conscription* or *Forced March*), increment the purple **`Face-down Discards`** counter.
5. **Enable Late War Era**: When Late War cards are shuffled into the draw deck (after Winter 1941), toggle the active deck mode from **`1. Mid War`** to **`2. + Late War`**.
6. **Read the Predictor**: Glance at the sidebar to view color-coded probability badges:
   * 🔴 **Red (≥ 60%)**: High danger — opponent very likely has this reaction in hand.
   * 🟡 **Yellow (30%–59%)**: Moderate risk.
   * 🟢 **Green (< 30%)**: Low risk — play is relatively safe.

---

## 🌐 Online Deployment (GitHub Pages)

To host this web app online for free via GitHub Pages:

1. Rename the HTML file to **`index.html`**.
2. Push the file to your GitHub repository.
3. In your GitHub repository, go to **Settings** ➔ **Pages**.
4. Under **Branch**, select `main` (or `master`) and click **Save**.
5. Your app will be live within a minute at `https://<your-username>.github.io/<your-repo-name>/`.

---

## 📜 Technical Stack

* **HTML5 / CSS3**: Flexbox, CSS Grid, CSS Variables.
* **Vanilla JavaScript (ES6+)**: Hypergeometric probability calculations, DOM manipulation, `LocalStorage` state management.
* **Dependencies**: None.

---

## ⚖️ Disclaimer

*Quartermaster General: South Front* is designed by Ian Brody and published by Ares Games / Griggling Games. This project is an unofficial, fan-made utility created solely for personal gameplay tracking and educational purposes. All card titles and game mechanics belong to their respective copyright holders.
