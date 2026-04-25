# getMNBRate – User Manual / Felhasználói útmutató

A custom Google Sheets function to fetch official MNB middle exchange rates / Egyéni Google Táblázat függvény az MNB középárfolyam lekérdezéséhez.

---

## English

### What is this?
`getMNBRate` is a custom Google Sheets function that fetches the official MNB middle exchange rate directly from the Hungarian National Bank.

### Installation
1. Open your spreadsheet and click **Extensions → Apps Script**
2. Paste the code from `Code.gs` and save (`Ctrl+S`)
3. Close the Apps Script editor

### Usage

#### Current rate
```
=getMNBRate("USD")
=getMNBRate("EUR")
=getMNBRate("CHF")
```

#### Rate for a specific date
```
=getMNBRate("USD"; DATE(2026;3;14))
=getMNBRate("EUR"; A1)
```
where `A1` contains a date value.

### Weekend and holiday fallback
If no rate is published for the requested date (weekend or public holiday), the function automatically returns the most recent available rate within the previous 7 days. For example, requesting 12/25/2025 will return the rate for 12/24/2025.

### Supported currencies (examples)
`USD`, `EUR`, `GBP`, `CHF`, `CZK`, `PLN`, `RON`, `JPY`, `CNY` – and many more. The full list is available on the [MNB website](https://www.mnb.hu/arfolyam-lekerdezes).

### Important notes
- Rates are expressed in **HUF per 1 unit** of the foreign currency
- On first run, Google will ask for permission to access an external URL — this must be approved

### Error messages
| Error | Meaning |
|---|---|
| `HTTP 404` | MNB server unreachable |
| `No data found` | No trading day found in the last 7 days |
| `Currency not found` | Unknown currency code |

---

## Magyar

### Mi ez?
Az `getMNBRate` egy egyéni függvény Google Táblázathoz, amely az MNB hivatalos középárfolyamát kérdezi le közvetlenül a Magyar Nemzeti Bank rendszeréből.

### Telepítés
1. Nyisd meg a táblázatot, majd kattints a **Bővítmények → Apps Script** menüpontra
2. Illeszd be a `Code.gs` tartalmát, majd mentsd el (`Ctrl+S`)
3. Zárd be az Apps Script szerkesztőt

### Használat

#### Aktuális árfolyam
```
=getMNBRate("USD")
=getMNBRate("EUR")
=getMNBRate("CHF")
```

#### Adott napi árfolyam
```
=getMNBRate("USD"; DATE(2026;3;14))
=getMNBRate("EUR"; A1)
```
ahol az `A1` cella egy dátumot tartalmaz.

### Hétvégi és ünnepnapi visszaesés
Ha a kért napra nincs MNB árfolyam (hétvége vagy ünnepnap), a függvény automatikusan az azt megelőző 7 napon belüli legutolsó elérhető árfolyamot adja vissza. Például: 2025.12.25-re lekérdezve a 2025.12.24-i árfolyamot kapjuk.

### Támogatott devizák (példák)
`USD`, `EUR`, `GBP`, `CHF`, `CZK`, `PLN`, `RON`, `JPY`, `CNY` – és még sok más. A teljes lista az [MNB weboldalán](https://www.mnb.hu/arfolyam-lekerdezes) érhető el.

### Fontos tudnivalók
- Az árfolyam **forintban (HUF)** értendő, egységnyi devizára vetítve
- Az első futtatáskor a Google engedélyt kér a külső URL eléréshez – ezt jóvá kell hagyni

### Hibaüzenetek
| Hibaüzenet | Jelentés |
|---|---|
| `HTTP 404` | Az MNB szervere nem elérhető |
| `No data found` | Az elmúlt 7 napban nem található árfolyamadat |
| `Currency not found` | Ismeretlen devizakód |

---

## License
MIT © Antal Mihalyi
