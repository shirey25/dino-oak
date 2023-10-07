// app.ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.post("/convert", async (context) => {
  const result = context.request.body({ type: "form-data" });
  const formData = await result.value;
  const file = formData.files("image");

  if (file && file[0].content) {
    const inputPath = "./input.jpg";
    const outputPath = "./output.png";
    await Deno.writeFile(inputPath, new Uint8Array(file[0].content));

    const process = Deno.run({ cmd: ["convert", inputPath, outputPath] });
    await process.status();

    context.response.body = await Deno.readFile(outputPath);
    context.response.headers.set("Content-Type", "image/png");
  } else {
    context.response.status = 400;
    context.response.body = "File upload is required.";
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });
