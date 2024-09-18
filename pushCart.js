import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getnavi, navi } from './const';
export const pushCart = async (db, nameUser, item, quantity, size) => {
    const load = doc(db, "Users", `${nameUser}`);
    const newItem = { ...item };
    try {
        const userDocSnap = await getDoc(load);
        if (userDocSnap.exists()) {
            const existingUser = userDocSnap.data();
            const updatedCart = [...existingUser.cart];
            let itemFound = false;

            updatedCart.forEach(itemtest => {
                if (itemtest.name == item.name) {
                    if (itemtest.size == undefined) {
                        itemtest.quantity += quantity;
                    }
                     else {
                        if (size === "M")
                            itemtest.size[0].quantity += quantity;
                        else {
                            itemtest.size[1].quantity += quantity;
                        }
                    }
                    itemFound = true;
                }
            });

            if (!itemFound) {

                if (newItem.size == undefined) {
                    newItem.quantity = quantity;
                } else {
                    newItem.size[0].quantity = 0
                    newItem.size[1].quantity = 0
                    if (size === "M")
                        newItem.size[0].quantity = quantity
                    else 
                        newItem.size[1].quantity = quantity
                }
                // Thêm mục sản phẩm đã được cập nhật vào giỏ hàng
                updatedCart.push({ ...newItem });
            }

            const updatedUser = {
                ...existingUser,
                name: `${nameUser}`,
                cart: item != null && updatedCart
            };

            await setDoc(load, updatedUser);
            console.log("Document successfully updated!");
        } else {
            const dt = {
                name: `${nameUser}`,
                cart: []
            };

            if (newItem.size == undefined) {
                newItem.quantity = quantity
            } else {
                newItem.size[0].quantity = 0
                newItem.size[1].quantity = 0
                if (size === "M")
                    newItem.size[0].quantity = quantity
                else 
                    newItem.size[1].quantity = quantity
            }
            // Thêm mục sản phẩm đã được cập nhật vào giỏ hàng
            dt.cart.push(newItem);

            // Lưu giỏ hàng vào cơ sở dữ liệu
            await setDoc(load, dt);
            console.log("Document successfully updated!");
        }
        return true;
    } catch (error) {
        console.error("Error getting user document:", error);
        return false;
    }
};
