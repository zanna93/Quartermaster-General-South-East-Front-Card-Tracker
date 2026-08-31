# ⚔️ Quartermaster General: South Front — Card Tracker & Predictor

A lightweight, standalone web application designed as a real-time tactical companion for the two-player wargame **Quartermaster General: South Front** (by Ian Brody / Ares Games).

This tool tracks revealed cards, logs face-down discards, and calculates the exact **hypergeometric probability** of your opponent holding specific reaction cards in hand—grouped strictly by Nation.

---

## ✨ Key Features

* **🧮 Invariant Probability Engine**  
  Accurately calculates real-time hand probabilities based on unrevealed cards and opponent hand size. Face-down discards properly reduce the remaining draw deck without artificially inflating reaction odds.

* **🎯 Clickable Reaction & Tactical Filters**  
  * **Reaction Filter**: Click any reaction badge (in the sidebar or on a card) to instantly filter the grid to those reaction cards.
  * **Action Filters**: Easily filter cards by effect type: 🚀 *Deploy*, ⚔️ *Attack*, 🥾 *Move*, ⚡ *Free Action*, 🏆 *VP*, or ❓ *Conditional*.

* **🗂️ Multi-Table Dropdown Management**  
  Switch between multiple saved games using the header dropdown. Quickly create a new game with **`+`** or delete old ones with **`🗑️`**.

* **📖 Historical Wikipedia Links**  
  Every card features a **`📖 Wiki`** button linking directly to the historical event, operation, or military unit depicted on the card.

* **🏛️ High-Contrast Nation Palette**  
  Visual design matching the physical components (**UK**, **USA**, **Free France**, **Pact/Italy**, **Germany**). Germany uses a dark charcoal background with white text for instant visual recognition.

* **🔒 Era Locks & Contingencies**  
  Includes Late War locking/prompts, automatic sorting of discarded cards to the bottom, and a collapsible Contingency cards panel.

---

## 🛠️ Quick Start

1. **Select Table & Faction**: Choose or create a **TABLE** from the top dropdown, then select **AXIS** or **ALLIES**.
2. **Set Hand Size**: Adjust your opponent's current hand size using the green **`OPPONENT HAND SIZE`** counter.
3. **Track Discards**:
   * Click **`Mark Discarded`** on revealed cards.
   * Log unrevealed discards (*Conscription*, *Forced March*) using the purple **`FACE-DOWN DISCARDS`** counter.
4. **Filter & Inspect**: Click any reaction in the sidebar or use the action buttons (Deploy, Attack, Move, etc.) to isolate specific cards.
5. **Enable Late War**: Toggle mode to **`2. + Late War`** when Late War cards are shuffled into the deck.

---

## 🌐 GitHub Pages Deployment

1. Rename the main HTML file to **`index.html`** in your repository.
2. In GitHub, go to **Settings ➔ Pages**.
3. Under **Branch**, select `main` (or `master`) and click **Save**.

---

## 📜 Technical Stack

* **Tech**: Pure HTML5, CSS3, Vanilla JavaScript (ES6+).
* **Persistence**: 100% client-side `LocalStorage` (offline support, zero database required).
* **Dependencies**: None.

---

## ⚖️ Disclaimer

*Quartermaster General: South Front* is designed by Ian Brody and published by Ares Games / Griggling Games. This project is an unofficial fan-made tool created for personal gameplay tracking.
