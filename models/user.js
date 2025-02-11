const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcBAv/EADgQAAICAQICBwQKAgIDAAAAAAABAgMEBREhMQYSE0FRYXEikaGxFCMyQmJygcHR4VJTkvEzNEP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AO1AAAAAAPG1GLlJpJcW33EFqPSCFe9eHFWS/wBj+yvTxLIanLJwqg52TjCK5uT2SIzJ1/Bo3UHO6XhBcPeyrZOVflT6+RbKcvPu9F3GEuJqft6TWN/U40Y/mlua76RZ74pUr0h/ZEAuCWj0hz1z7F+sP7M9XSa5f+XHrl+VtfyQQGC2Y/SLDt4Wxspl5rde9EpTdVfDrU2wsj4xluc/MlN1tM+vVZKE13xezJhroAK3p3SKSca8+O6/2xXzRYarIXVqyqSlCS3Uk90yWK+wAQAAAAAAAADHffVj0yuumowjzZ9TlGEJTsajGK3bfgU3V9SnqF+63jRF+xH935lwe6rq1ufNxh1oUb8IJ/a9SOANMgB5KShFyk+qlzb7gPTyUowW85KK83sQ+Zq0pNwxfZj/AJtcf0IuUpTbc5OTfNt7gWj6RTvwtr/5IypprdNNeRUdkfdN1lMutVOUX5AWsEbp+p9s1VelGx8pLlIkgBuadqN+Bb1q31oN+1W3wl/ZpgC+YWZTm0K2iW65NPnF+DNgomn5tuDkK2riuUo90kXbFyK8rHhdU94TXu8jNi6ygAigAAAGDOyY4mJbfL7kd0vF9wEF0m1BymsOmXCPG3bvfcivn1ZOVk5Tm95Se7b72fJtNAAEOCXEr+p5ryZuuEn2UXw/E/Ek9XudOFLq/asfV9PErwAAAAAQOPcyTwNUsViryJdaD4dZ84kYCi3Aw4Vna4lM3zcVuZgBLdHtQeLlKiyX1Nr2f4X3P9iJAHRHwYNDRMz6ZgQlN/Ww9ifqu/3G+YaAAAK/0syNq6MZP7Tc5L4L9ywFN6RW9rq1vhBKK93H4tlhUaADTIAAInpA3tjrublv8CHJfXLqpqNS3dsHvy4Ldf8AREAAAQAAAAD5MCy6YtsCn8psmLFSjjVRi00oLijKUAABN9FchwzZ0N+zbHh6r+ty0lE063sM/Ht7o2R39N+PwL2ZqwABFCialJz1DJk++2XzL2ULNW2ZevCyXzNQrAACsg70ABXNWi459jf3tmvcahM67Q3GF65L2ZfsQwAAEAAAAD2EXOajFbuXBLzKLDpC20+rfz29N2bh8UVqmmFa5RSR9gAAB6ns9/DidBg+tCMvFJnPXyOg1cKoL8K+RKsfYAMqFI1mHZ6rlR/Hv7+P7l3Kr0qpcM6F23CyHPzRYVCgA0yAAA0mmpLdNbNPvKrk19lkW1/4yaXoWoh9cxmprIjyfCe3wYESAAAAIHMnNJw64015E4t2NPZ78Fx8CIxqJZF8aoc5Pn4ItEIqEIwitoxWyRR6AAAAA+6YOy6uC5zmo+9nQdtuC7il6DT22qU8OFb67/Tl8di6EqwABlQi+kWL9J0+U0vap9tenf8AD5EoeNJrZrdPmgOeA3NWwng5s69vq37Vb8jTNsgAAHk4xnFxnFSi1s0+8SlGMXKTUYrvZoZGrUV7xqTsl5fZ94EPmVKjKtqjvtGWy38DCfd1jutnZJJOT32R8AAABNaDXHsLJ9X2nNrfy2X8koV7A1CWJFw6inBvd9zJbH1HGu2XX6kvCfD4gbYHp+gAAGbExrMvJror+1N8/DzAsHRXF6uPZktcbH1Y7+C/v5E8Y6KoUUwqrW0IRUUZDNaAAQAABoaxp8dQxXFcLYca35+H6lLtTplJWrquL2knw2Ohla6YdHparR9IwntlQ/8AnvsrV/PmalRVLdTxa+VnXf4FuaN2s2S4UVqC7nLiyMnCVc3CcZRnF7SjJbNM8Kj7tutue91kpvzPgAAACAAAAAKM+Pl34/Gqxpd6fFEjRrS5ZFTX4ofwQ4As9OZj3cK7Yt9y32fuLroGm/Qqe2uX19i5P7i8Cv8AQ7os6nDUdUq2muNNEly/FLz8EXYzauAAIoAAAAAAACB6R9GcXWV2sGqMxLhalwl5SXf68zm+qaXmaVf2OdS62/syXGM/RnZjFk49OVTKnIqhbVLnCa3TLo4kDoGq9A6LW56Xf2D7qrd5R9/NfEquf0a1fAbduFZZBffpXaL4cV7i6iJB7JOL2mnF+D4HgAALi9lxfgABI4OharnbfR8G5xfKc49SPve2/wChaNL6A8VPVcnh/qx385P9kNFNwsTIzshY+JTO218oxXxfgjoXRrohTpso5Wf1b8pcVH7lb8vF+ZYMDAxNPo7DDohTX4R7/V83+psk1QAEAAAAAAAAAAAAAAC5sADFdjUX8L6a7PzxT+Zpy6PaNN7y0vE38qkgCwfEej+jR5aXifrUn8zdpwsTG/8AXxaavyVqPyPQKMqe/FnoBAAAAAAAAAAAH//Z",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hashedPassword != userProvidedassword) {
    throw new Error("Incorrect Password");
  } else {
    return user;
  }
});
const User = model("user", userSchema);

module.exports = User;
