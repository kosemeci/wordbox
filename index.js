
const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

app.set("view engine","ejs");
app.use(express.static("public")); // proje içinde images css tarzı dosyaları kullanıma açmak için
app.use(express.static("node_modules")); //bootstrap css i de dışarıya açmak için
//bu işlemi yaptıktan sonra dosyaların adı html değil ejs olarak değişiyo ve view klasörü açılıyo

app.use(userRoutes);

app.listen(3000,()=>{
    console.log("server is running at 3000 port");
})