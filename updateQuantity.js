import { doc, setDoc, getDoc } from 'firebase/firestore';

export const updateQuantity = async (db, nameUser, item, quantity, size) => {
    const load = doc(db, "Users", `${nameUser}`);
    try {
        const userDocSnap = await getDoc(load);
        const existingUser = userDocSnap.data();
        const updatedCart = [...existingUser.cart];

        //console.log(item.quantity)
        updatedCart.forEach(itemTest => {
            if (itemTest.name === item.name) {
                if (itemTest.size === undefined) {
                    itemTest.quantity = item.quantity;
                } else {
                    if (size === "M") {
                        itemTest.size[0].quantity = item.quantity;
                    } else {
                        itemTest.size[1].quantity = item.quantity;
                    }
                }
            }
        });

        const updatedUser = {
            ...existingUser,
            name: `${nameUser}`,
            cart: updatedCart,
        };

        await setDoc(load, updatedUser);
        //console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error getting user document:", error);
    }
};



