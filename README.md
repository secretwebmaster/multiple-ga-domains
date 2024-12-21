# Google Analytics Tracking Script Template

This repository, **secretwebmaster/multiple-ga-domains**, provides a **Google Analytics 4 (GA4) tracking script template** designed to dynamically load GA tracking IDs based on the current domain. It also includes a default GA ID to ensure all traffic is tracked, even if the domain does not have a specific ID assigned.

---

## Features
- Supports **multiple domains** with individual Google Analytics IDs.
- Automatically applies a **default GA ID** for all domains.
- Dynamically appends tracking scripts to the document.
- Ensures GA script loads only after the DOM is fully loaded.
- Checks and prefixes GA IDs with **`G-`** if missing.

---

## Usage

### Method 1: Include as External Script File

#### 1. Copy the Script to Your Project
Download or copy the **`script.js`** file and include it in your project.

#### 2. Add the Script to Your HTML
Include the script reference in your HTML file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Analytics Demo</title>
  <script src="script.js"></script>
</head>
<body>
  <h1>Google Analytics Tracking Template</h1>
</body>
</html>
```

### Method 2: Include Script Directly in HTML

#### 1. Copy the Script Code
Paste the following script directly inside your HTML file:
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const defaultGAId = 'DEMO_DEFAULT_ID';
    const domainGAIds = {
      'example1.com': 'DEMO_ID_1',  
      'example2.com': 'DEMO_ID_2',  
      'example3.com': 'DEMO_ID_3',  
    };
    const currentDomain = window.location.hostname;
    const loadGA = (gaId) => {
      const fullGAId = gaId.startsWith('G-') ? gaId : `G-${gaId}`;
      const scriptTag = document.createElement('script');
      scriptTag.async = true;
      scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${fullGAId}`;
      document.head.appendChild(scriptTag);
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', fullGAId);
    };
    const gaIdSuffix = domainGAIds[currentDomain];
    if (gaIdSuffix) {
      loadGA(gaIdSuffix);
    } else {
      console.warn("No specific GA ID found for this domain:", currentDomain);
    }
    loadGA(defaultGAId);
  });
</script>
```

---

## Configuration
Edit **`script.js`** or the inline script and update the following:

#### Default GA ID:
```javascript
const defaultGAId = 'YOUR_DEFAULT_GA_ID';
```

#### Domain-specific GA IDs:
```javascript
const domainGAIds = {
  'example1.com': 'GA_ID_1',  
  'example2.com': 'GA_ID_2',  
  'example3.com': 'GA_ID_3',  
};
```
Replace the placeholder values with your own GA IDs.

---

## How It Works
1. The script detects the current domain using:
```javascript
const currentDomain = window.location.hostname;
```

2. It looks for a matching GA ID in the `domainGAIds` object.
3. If found, it loads the domain-specific GA ID.
4. It always loads the **default GA ID** to track all domains.
5. The script dynamically appends the GA tracking tag to the page.

---

## Troubleshooting
- **No GA ID Found for Domain:** If no specific GA ID is set for a domain, it logs a warning in the console:
```plaintext
No specific GA ID found for this domain: example.com
```
- **Verify Tracking:** Use browser dev tools to inspect network requests to Google Analytics.

---

## Changelog

### [1.0.0] - 2024-12-21
- Initial release with support for dynamic Google Analytics tracking.
- Added domain-specific IDs and fallback to a default GA ID.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## Author

Created by **Secret Webmaster** - [GitHub Profile](https://github.com/secretwebmaster/)

