import express, { Application, Request, Response } from "express";
import fs from "fs";
import studentRoute from "./routers/student.router";

const PORT: number = 5000;

// Define API config
const app: Application = express();

// General middleware config
app.use(express.json()); // untuk membaca data dari req.body

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Express API</h1>");
});

// config route
app.use("/student", studentRoute);

// POST : untuk menambah data
app.post("/student", (req: Request, res: Response) => {
  // 1. Mengakses data dari db.json
  const data = JSON.parse(fs.readFileSync("./db.json").toString());
  // 2. Generate id data baru
  const newId = data[data.length - 1].id + 1;
  // 3. Tambahkan data baru ke array
  data.push({ id: newId, ...req.body });
  // 4. Tulis ulang isi file db.json
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 4));
  // 5. Kirim response
  res.send({
    message: "Add data success",
    result: data,
  });
});

// // PUT / PATCH : untuk memperbarui data
// app.patch("/student/:id", (req: Request, res: Response) => {
//   console.log("PATCH", req.params, req.body);
//   const findIdx = dbStudent.findIndex((val: any) => {
//     return val.id === parseInt(req.params.id);
//   });
//   dbStudent[findIdx] = { ...dbStudent[findIdx], ...req.body };
//   // {id:3, name:"andre", email:"andre@mail.com", name:"andre hidayat", email:"andre@mail.com"}
//   res.send({
//     message: "Update success",
//     result: dbStudent[findIdx],
//   });
// });

// // DELETE : untuk menghapus data
// app.delete("/student/:id", (req: Request, res: Response) => {
//   console.log("DELETE", req.params);
//   const findIdx = dbStudent.findIndex((val: any) => {
//     return val.id === parseInt(req.params.id);
//   });
//   dbStudent.splice(findIdx, 1);
//   res.send("Delete data");
// });

app.listen(PORT, () => {
  console.log(`API is RUNNING http://localhost:${PORT}`);
});
