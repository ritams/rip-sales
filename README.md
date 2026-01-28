# RiP sales

A minimalist, mobile-first yard sale website designed to showcase pre-loved treasures with elegance.

## Features

- **Premium Design**: Minimalist aesthetic with olive green accents and responsive layout.
- **Search & Filter**: Real-time searching and category filtering.
- **Sorting**: Sort items by Newest, Price (Low to High), or Price (High to Low).
- **WhatsApp Integration**: Direct "Inquire" links to message the seller via WhatsApp.
- **Data Driven**: Content managed via a simple JSON file.

## Tech Stack

- HTML5
- CSS3 (Variables, Flexbox, Grid)
- JavaScript (Vanilla)

## Setup

1. Clone the repository.
2. Open `index.html` in your browser.

## Customization

### Adding Products
Edit `data/products.json` to add new items:

```json
{
  "id": 8,
  "name": "Item Name",
  "price": 500.00,
  "currency": "INR",
  "image": "URL_TO_IMAGE",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "status": "available",
  "description": "Description here."
}
```

### Changing WhatsApp Number
Open `js/app.js` and update the `WHATSAPP_PHONE` constant:

```javascript
const WHATSAPP_PHONE = '919876543210'; // Your number with country code
```

## Credits

Web imagined by [ritam](https://ritampal.com).
