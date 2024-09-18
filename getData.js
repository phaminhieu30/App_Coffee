import { collection, query, where, getDocs, doc} from "firebase/firestore";
import db from './firebaseSetting';
import { useState } from "react";

async function loadDataToCart(name) {
    const q = query(collection(db, "Users"),where("name", "==", name));
    try {
        const docSnap = await getDocs(q);
        const docs = [];
        docSnap.forEach(docdata => {
            docdata.data().cart.forEach(item=>{
                docs.push(item)
            })
        });
        return docs; // Trả về bản ghi đầu tiên (vì bạn đang tìm kiếm theo ID)
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

// Chuyển đổi chữ tiếng việt thành viết thường và không dấu
const removeVietnameseTones = (str) => {
    str = str.toLowerCase()
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    str = str.replace(/[đĐ]/g, 'd')
    return str
}

async function findItem(searchKey) {
    const collections = ["coffehot", "coffecold", "Yogurt", "Other", "Cake", "IceCream"]
    let results = []
    const lowerCaseSearchKey = removeVietnameseTones(searchKey)

    for (const coll of collections) {
        const q = query(collection(db, coll))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            const description = removeVietnameseTones(data.description || "")
            const name = removeVietnameseTones(data.name || "")
            if (description.includes(lowerCaseSearchKey) || name.includes(lowerCaseSearchKey)) {
                results.push({ ...data, id: doc.id, collection: coll })
            }
        })
    }
    return results
}

async function fetchData(category, id) {
    if (id == null)
        q = collection(db, category)
    else
        q = query(collection(db, category), where("id", "==", id))

    try {
        const docSnap = await getDocs(q);
        const docs = [];
        docSnap.forEach(docdata => {
            docs.push(docdata.data());
        });
        if (id != null)
            return docs[0]
        return docs
    } catch (error) {
        console.error("Error fetching document:", error)
    }
}

async function itemFavourite(nameUser, item) {
    const q = query(collection(db, "Favourites"), where("name", "==", nameUser))
    try {
        const docSnap = await getDocs(q)
        const docs = []
        docSnap.forEach(doc => {
            docs.push(doc.data())
        })

        if (docs.length === 0) {
            console.log("Không tìm thấy người dùng")
            return null
        }

        const user = docs[0]
        if (!user.ListFavourite) {
            console.log("Không tìm thấy danh sách yêu thích");
            return null
        }

        const listFavourite = user.ListFavourite

        if (item) {
            const favouriteItem = listFavourite.find(favItem => favItem.name == item.name)
            if (favouriteItem) {
                return favouriteItem.liked
            } else {
                return false
            }
        } else {
            const likedItems = listFavourite.filter(item => item.liked == true)
            return likedItems
        }
    } catch (error) {
        console.error("Error fetching document:", error)
        return null
    }
}

export { loadDataToCart, fetchData, itemFavourite, findItem }
