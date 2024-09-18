import { doc, setDoc, getDoc } from 'firebase/firestore';

export const pushFavourite = async (db, nameUser, item) => {
    const load = doc(db, "Favourites", `${nameUser}`);
    const newItem = { ...item };
    try {
        const userDocSnap = await getDoc(load);
        if (userDocSnap.exists()) {
            const existingUser = userDocSnap.data();
            const updatedFavourite = [...existingUser.ListFavourite];
            let itemFound = false;

            updatedFavourite.forEach(itemtest => {
                if (itemtest.name == item.name) {
                    if (itemtest.liked == true) {
                        itemtest.liked = false
                    }
                    else {
                        itemtest.liked = true
                    }
                    itemFound = true;
                }
            });

            if (!itemFound) {
                newItem.liked = true
                // Thêm mục sản phẩm đã được cập nhật vào giỏ hàng
                updatedFavourite.push({ ...newItem });
            }

            const updatedUser = {
                ...existingUser,
                name: `${nameUser}`,
                ListFavourite: item != null && updatedFavourite
            };

            await setDoc(load, updatedUser);
            console.log("Document successfully updated!");
        } else {
            const dt = {
                name: `${nameUser}`,
                ListFavourite: []
            };

            newItem.liked = true

            dt.ListFavourite.push(newItem);

            await setDoc(load, dt);
            console.log("Document successfully updated!");
        }
        return true;
    } catch (error) {
        console.error("Error getting user document:", error);
        return false;
    }
};