import express, { Application, Request, Response } from "express";

const PORT: number = 5000;

const dbStudent: any[] = [
  {
    id: 1,
    name: "Hajra",
    email: "hajra@mail.com",
  },
  {
    id: 2,
    name: "Arco",
    email: "arco@mail.com",
  },
];

// Define API config
const app: Application = express();

// General middleware config
app.use(express.json()); // untuk membaca data dari req.body

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Express API</h1>");
});

// GET : untuk membaca data
app.get("/student", (req: Request, res: Response) => {
  console.log(req.query);
  res.send(dbStudent);
});

// POST : untuk menambah data
app.post("/student", (req: Request, res: Response) => {
  console.log("POST", req.body);
  dbStudent.push(req.body);
  res.send({
    message: "Add data success",
    result: dbStudent,
  });
});

// PUT / PATCH : untuk memperbarui data
app.patch("/student/:id", (req: Request, res: Response) => {
  console.log("PATCH", req.params, req.body);
  const findIdx = dbStudent.findIndex((val: any) => {
    return val.id === parseInt(req.params.id);
  });
  dbStudent[findIdx] = { ...dbStudent[findIdx], ...req.body };
  // {id:3, name:"andre", email:"andre@mail.com", name:"andre hidayat", email:"andre@mail.com"}
  res.send({
    message: "Update success",
    result: dbStudent[findIdx],
  });
});

// DELETE : untuk menghapus data
app.delete("/student/:id", (req: Request, res: Response) => {
  console.log("DELETE", req.params);
  const findIdx = dbStudent.findIndex((val: any) => {
    return val.id === parseInt(req.params.id);
  });
  dbStudent.splice(findIdx, 1);
  res.send("Delete data");
});

app.listen(PORT, () => {
  console.log(`API is RUNNING http://localhost:${PORT}`);
});
