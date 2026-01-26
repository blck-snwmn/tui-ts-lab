export interface DiffData {
  filename: string;
  language: string;
  diff: string;
}

export const sampleDiffs: DiffData[] = [
  {
    filename: "src/utils.ts",
    language: "typescript",
    diff: `--- a/src/utils.ts
+++ b/src/utils.ts
@@ -1,3 +1,11 @@
 export function add(a: number, b: number): number {
+  // Improved implementation with validation
+  if (typeof a !== "number" || typeof b !== "number") {
+    throw new Error("Arguments must be numbers");
+  }
   return a + b;
 }
+
+export function subtract(a: number, b: number): number {
+  return a - b;
+}`,
  },
  {
    filename: "src/api/client.ts",
    language: "typescript",
    diff: `--- a/src/api/client.ts
+++ b/src/api/client.ts
@@ -1,4 +1,19 @@
-export async function fetchData(url: string) {
+export async function fetchData<T>(url: string): Promise<T> {
   const response = await fetch(url);
-  return response.json();
+  if (!response.ok) {
+    throw new Error(\`HTTP error! status: \${response.status}\`);
+  }
+  return response.json() as Promise<T>;
+}
+
+export async function postData<T, R>(url: string, data: T): Promise<R> {
+  const response = await fetch(url, {
+    method: "POST",
+    headers: { "Content-Type": "application/json" },
+    body: JSON.stringify(data),
+  });
+  if (!response.ok) {
+    throw new Error(\`HTTP error! status: \${response.status}\`);
+  }
+  return response.json() as Promise<R>;
 }`,
  },
  {
    filename: "README.md",
    language: "markdown",
    diff: `--- a/README.md
+++ b/README.md
@@ -1,9 +1,27 @@
 # My Project

-A simple project.
+A simple project with improved documentation.
+
+## Features
+
+- Feature A
+- Feature B
+- Feature C

 ## Installation

 \`\`\`bash
 npm install
-\`\`\`
+\`\`\`
+
+## Usage
+
+\`\`\`typescript
+import { add, subtract } from "./utils";
+
+console.log(add(1, 2)); // 3
+\`\`\`
+
+## License
+
+MIT`,
  },
];
