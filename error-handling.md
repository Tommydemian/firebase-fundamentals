# Errro handling optiomizations:
1. Descriptive message in catch or error message
```javascript
try {
    // code
} catch (e) {
    console.error("Error occurred while fetching x:", e);
}
```

2. Early return/ Clause guard:
```javascript
function exampleFunction(param) {
    if (!param) {
        console.error("Param is required");
        return;
    }

    // main code of the function
}

```