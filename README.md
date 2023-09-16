## Create a new React app with Vite:

```

yarn create vite

```

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#install-the-dependencies)Install the dependencies**

```

yarn

```

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#install-the-necessary-dependencies)Install the necessary dependencies**

```

yarn add -D vitest jsdom @testing-library/react @testing-library/jest-dom

```

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#add-a-raw-test-endraw-script)Add a `test` script**

In your `package.json` file, add the following line under the `scripts` attribute:

```

"scripts": {

+  "test": "vitest"

}

```

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#create-a-setup-tests-file)Create a setup tests file**

Create a new file under `tests/setup.ts` with the following content:

```

import { expect, afterEach } from 'vitest';

import { cleanup } from '@testing-library/react';

//import matchers from '@testing-library/jest-dom/matchers';

import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {

cleanup();

});

```

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#configure-vite-to-use-this-setup)Configure vite to use this setup**

Edit the file `vite.config.js` in the root folder

```
// if you use js files must end up with .js
plugins: [react()],

+  test: {

+    environment: 'jsdom',

+    setupFiles: ['./tests/setup.js'],

+    testMatch: ['./tests/**/*.test.jsx'],

+    globals: true

+  }

```

That is all the configuration needed.

Now, let's go ahead and create a quick test to try this out

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#your-first-test)Your first test**

Create a test file at `tests/App.test.tsx`

```

touch tests/App.test.tsx

```

### **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#add-the-following-content)Add the following content**

```

import { render, screen } from '@testing-library/react';

import App from "../src/App";

describe('App', () => {

it('renders headline', () => {

render(<App />);

const headline = screen.getByText(/It works and you found me!/i);

expect(headline).toBeInTheDocument();

});

});

```

### **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#run-the-tests-and-expect-to-fail)Run the tests (and expect to fail)**

```

yarn test

```

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#fix-the-test)Fix the test**

Replace the html content of the `App.tsx` file with the following:

```

+  return (

+    <div>

+      <h1>It works and you found me!</h1>

+    </div>

+  )

```

## **[](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb#run-the-tests)Run the tests**

Try running again the tests, it should be working fine now!

## **Absolute path in vite ~/path**

Eğer typescript kullanıyorsan `tsconfig.json` javascript kullanıyorsanız `jsconfig.json` dosyasını ana dizinde oluşturun ve içine şunları yazın:

```js

{

"compilerOptions": {

"baseUrl": "./src",

"paths": {

"~/*": ["./*"]

}

}

}

```

JavaScript

ve `vite.config.(ts|js)` dosyanızı açıp şunu ekleyin:

```js

resolve: {

alias: {

'~': path.resolve(__dirname, 'src'),

},

},

```

JavaScript

Eğer `path` bulamazsa en üstte şöyle import edin:

```js
import * as path from 'path'
```

JavaScript

Vite'i yeniden başlatın, hazırsınız

teşekkürler [prototurk](https://prototurk.com/makaleler/vite-absolute-path)
