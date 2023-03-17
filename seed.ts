import mongoose from "mongoose";
import { User } from "./src/models/User";
const data = require("./data.json");
const descriptions = [
    "I'm a friendly person who loves meeting new people and trying new things.",
    "As someone who's passionate about technology, I'm always looking for ways to stay up-to-date with the latest developments.",
    "I take my health seriously and enjoy staying active through activities like hiking and yoga.",
    "One of my favorite hobbies is reading, and I can often be found with my nose buried in a good book.",
    "I'm a bit of a foodie and love exploring new restaurants and cuisines.",
    "As a creative person, I enjoy expressing myself through various art forms, such as painting and writing.",
    "I'm a natural problem-solver and enjoy taking on challenges that require a bit of out-of-the-box thinking.",
    "I'm an avid traveler and enjoy immersing myself in new cultures and experiences.",
    "I value my relationships with friends and family and prioritize spending time with them.",
    "I believe in giving back to my community and am always looking for ways to volunteer and make a positive impact.",
];

const users = data.results.map((user: any) => ({
    username: user.login.username,
    password: "123123",
    fullName: `${user.name.first} ${user.name.last}`,
    phone: user.phone,
    avatar: user.picture.medium,
    describe: descriptions[Math.floor(Math.random() * descriptions.length)],
    language: ["en", "cn", "fr", "ja", "ru"][Math.floor(Math.random() * 5)],
    city: user.location.city,
}));

console.log(users);

mongoose
    .connect(
        "mongodb+srv://leeahn:iwannafly123@mydb.b0w0n.mongodb.net/chatapp?retryWrites=true&w=majority"
    )
    .then(async () => {
        const a = await User.count();
        console.log(a);
    })
    .catch((err) => console.log(err));
