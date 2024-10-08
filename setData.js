import React, { useEffect } from "react";
import { collection, doc, setDoc,query, where } from 'firebase/firestore';
import db from './firebaseSetting'; // Import your Firebase configuration

function App() {
    useEffect(() => {
        async function fetchData() {
            const Cold = [
                {
                id: 1,
                    name: "Trà xanh đá xay",
                    description: "Trà xanh đá xay là thức uống được kết hợp giữa kem tươi béo ngậy, sữa ngọt ngào và lá trà xanh Nhật Bản. Matcha đá xay có vị chát nhẹ và hương thơm quyến rũ đặc trưng của lá trà xanh. Matcha có tác dụng tốt với thể chất và tinh thần, kích thích làm tỉnh táo và giảm căng thẳng.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xfrappematcha.png.pagespeed.ic.JbFULEvSU5.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 69000 
                        },
                        {
                            sizeName: "L",
                            price: 89000
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Caramen đá xay",
                    description: "Sự kết hợp hoàn hảo của hương vị caramel đặc trưng, bột frappe, bột sữa, đường bắp đã giúp cho món đồ uống caramel đá xay có độ thơm ngon sánh mịn cùng hương vị đậm đà độc đáo.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xcaramelfrappe.png.pagespeed.ic.G2cr7Q28jw.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 49000 
                        },
                        {
                            sizeName: "L",
                            price: 79000
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Mocha đá xay",
                    description: "Mocha đá xay là sự hòa quyện hoàn hảo giữa vị đắng thơm của cà phê, bột cacao cùng vị beo béo của kem tươi và sữa tươi. Món thức uống thơm ngon này chắc hẳn sẽ khiến ai nếm thử cũng phải ngất ngây.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xmochafrappe.png.pagespeed.ic.Cypt_WeqFU.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 55000 
                        },
                        {
                            sizeName: "L",
                            price: 69000
                        }
                    ]
                },
                {
                    id: 4,
                    name: "Latte đá xay",
                    description: "Latte đá Latte đá xay được chế biến từ Espresso, sữa tươi và đá xay, thích hợp sử dụng trong mùa nóng. Latte đá xay có vị đặc trưng của cà phê Espresso, hòa quyện cùng sữa tươi và được thêm đá xay để tạo nên sự mát mẻ, sảng khoái.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xlattefrappe.png.pagespeed.ic.GmXWUv_xTo.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 59000 
                        },
                        {
                            sizeName: "L",
                            price: 79000
                        }
                    ]
                },
                {
                    id: 5,
                    name: "Sữa chua Dâu",
                    description: "Sữa chua dâu tây thơm béo với hương vị ngọt, chua nhẹ và tươi mát từ những quả dâu tây chín mọng sẽ là một thức uống thơm ngon và bổ dưỡng dành cho bạn",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xyogurt-dau.png.pagespeed.ic.35gPPot-p_.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 59000 
                        },
                        {
                            sizeName: "L",
                            price: 75000
                        }
                    ]
                },
                {
                    id: 6,
                    name: "Sữa chua Dừa - Kiwi",
                    description: "Sữa chua dừa hữu cơ cho bé vị chuối, kiwi Babybio được làm từ sữa dừa và hoa quả nghiền được lên men tự nhiên, có độ chua vừa phải và độ ngậy béo của quả dừa.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xyogurt-kiwi.png.pagespeed.ic.tXSyeCVuqT.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 59000 
                        },
                        {
                            sizeName: "L",
                            price: 75000
                        }
                    ]
                }
            ]
            try{
                Cold.forEach((drinkData) => {
                        const drink = doc(db,"Yogurt",`${drinkData.id}`)
                        console.log(drink)
                        setDoc(drink,drinkData,{merge:true},{capital:true})
                        console.log(drinkData)
                });
            }
            catch(error){
                console.log(error)
            }
            const ice = [
                {
                    id: 1,
                    name: "Kem ốc quế",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/desserts/xmcdonalds_cone.png.pagespeed.ic.e59R2gJypI.webp",
                    price: 12000
                },
                {
                    id: 2,
                    name: "Kem Sundae sốt Sôcôla",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/desserts/xhotfudge_mcsundae.png.pagespeed.ic.aZiwlX7DT-.webp",
                    price: 29000
                },
                {
                    id: 3,
                    name: "Kem Sundae sốt Dâu",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/desserts/xstrawberry-mcsundae.png.pagespeed.ic.XQtJUMkTRF.webp",
                    price: 29000
                },
                {
                    id: 4,
                    name: "Kem Xay Bánh Oreo",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/desserts/xoreo_mcflurry.png.pagespeed.ic.X74SrJJa1S.webp",
                    price: 35000
                },
                {
                    id: 5,
                    name: "Kem Xay Bánh Oreo Trà Xanh",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/desserts/xmcfmc.png.pagespeed.ic.H9LOPK6FY3.webp",
                    price: 39000
                }
            ]
            try{
                ice.forEach((drinkData) => {
                        const drink = doc(db,"IceCream",`${drinkData.id}`)
                        console.log(drink)
                        setDoc(drink,drinkData,{merge:true},{capital:true})
                        console.log(drinkData)
                });
            }
            catch(error){
                console.log(error)
            }
                const drinkDataArray = [
                    {
                        id: 1,
                        name: "Cà phê sữa đá Việt Nam",
                        description: "Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
                        imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xiced_milkVNcoffee.png.pagespeed.ic.c95-PmcQXX.webp",
                        size: [
                            { sizeName: "M", price: 35000 },
                            { sizeName: "L", price: 49000 }
                        ]
                    },
                    {
                    id: 2,
                    name: "Cappuccino",
                    description: "Cappuccino với hương vị cà phê sữa đậm đà, vị cà phê đậm hơn Latte. Thêm sữa tươi và bọt sữa trang trí tỉ mỉ.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xcappucino.png.pagespeed.ic.k1IWeRdO94.webp",
                    size: [
                    {
                        "sizeName": "M",
                        "price": 49000
                    },
                    {
                        "sizeName": "L",
                        "price": 79000
                    }
                    ]
                },
                {
                id: 3,
                name: "Matcha Latte Nóng",
                description: "Matcha latte được biến tấu độc đáo từ Coffee latte. Nó được thay thế nguyên liệu cà phê bằng nguyên liệu bột trà xanh có hàm lượng cafein ít hơn cà phê để phục vụ những khách hàng không thích nạp nhiều cafein vào trong cơ thể.",
                imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xhotmatcha.png.pagespeed.ic.i1Eo-BIuI3.webp",
                size: [
                    {
                        "sizeName": "M",
                        "price": 60000
                    },
                    {
                        "sizeName": "L",
                        "price": 90000
                    }
                ]},
                {
                id: 4,
                name: "Sô cô la nóng",
                description: "Sô-cô-la nóng, hay cacao nóng, là đồ uống nóng thường bao gồm sô-cô-la, sô-cô-la hòa tan hay cacao được đun nóng với sữa thêm nước và đường.",
                imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xhotchoco.png.pagespeed.ic.JeBzsBa6Hl.webp",
                size: [
                    {
                        "sizeName": "M",
                        "price": 49000 
                    },
                    {
                        "sizeName": "L",
                        "price": 70000
                    }
                ]
            },
            {
                id: 5,
                name: "Latte nóng",
                description: "Một sự kết hợp tinh tế giữa vị đắng cà phê Espresso nguyên chất hòa quyện cùng vị sữa nóng ngọt ngào, bên trên là một lớp kem mỏng nhẹ tạo nên một tách cà phê hoàn hảo về hương vị lẫn nhãn quan.",
                imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xhotlatte.png.pagespeed.ic.R7x0I_O1_4.webp",
                size: [
                    {
                        "sizeName": "M",
                        "price": 49000 
                    },
                    {
                        "sizeName": "L",
                        "price": 70000
                    }
                ]},
                {id: 6,
                name: "Cà phê Mocha",
                description: "Mocha Nóng sự hoà quyện giữa vị đắng cà phê espresso và sốt sô cô la, thêm ngọt ngào từ sữa tươi và nghệ thuật tạo trang trí đẳng cấp.",
                imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xmocha.png.pagespeed.ic.ojvyB7tqPu.webp",
                size: [
                    {
                        "sizeName": "M",
                        "price": 59000 
                    },
                    {
                        "sizeName": "L",
                        "price": 79000
                    }
                ]}];  
                
                console.log(typeof(drinkDataArray))
                console.log("do")
                try{
                drinkDataArray.forEach((drinkData) => {
                        const drink = doc(db,"coffehot",`${drinkData.id}`)
                        console.log(drink)
                        setDoc(drink,drinkData,{merge:true},{capital:true})
                        console.log(drinkData)
                });
            }
            catch(error){
                console.log(error)
            }
            const Cake = [
                {
                    id: 1,
                    name: "Bánh Tiramisu",
                    description: "Tiramisu là một loại bánh ngọt tráng miệng vị cà phê của nước Ý, gồm các lớp bánh quy Savoiardi, nhúng cà phê xen kẽ với hỗn hợp trứng, đường, phô mai mascarpone đánh bông, thêm một ít bột cacao.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xTIRAMISU.png.pagespeed.ic.3U83V4hrQ0.webp",
                    price: 55000
                },
                {
                    id: 2,
                    name: "Bánh Phô mai nướng",
                    description: "Bánh phô mai nướng xém, thành phần chính là phô mai và trứng muối kèm trứng muối rắc trên mặt bánh. Bánh ngọt và béo. Tất cả các vị đều có cranberry.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xBAKED-CHEESECAKE.png.pagespeed.ic.e5EacbrXng.webp",
                    price: 35000
                },
                {
                    id: 3,
                    name: "Bánh nướng vị chuối",
                    description: "Bánh nướng vị chuối sẽ hơi ngọt nhẹ, thơm hương chuối, một chút bùi bùi của hạt óc chó, chất bánh xốp mịn với chất lượng 5 sao sẽ không khiến bạn thất vọng.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xBANANA-MUFFIN.png.pagespeed.ic.YHoRFmbtCA.webp",
                    price: 30000
                },
                {
                    id: 4,
                    name: "Bánh Brownie Sô-cô-la",
                    description: "Bánh brownie luôn là một món ăn được yêu thích tại Maison Marou với hương vị đậm đà từ sô-cô-la Việt Nam 65% cùng hạt điều ngào đường và sô-cô-la chip.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xCHOCO-BROWNIE.png.pagespeed.ic.Ji06bSvy4S.webp",
                    price: 30000
                },
                {
                    id: 5,
                    name: "Bánh Macaron Dừa 2 cái",
                    description: "Bánh macaroons dừa làm từ dừa sợi tươi và lòng trắng trứng để làm ra những chiếc bánh dừa rất thơm ngon, ngọt bùi vị dừa.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xCOCONUT-MACAROON.png.pagespeed.ic.Hj9iPYv7j7.webp",
                    price: 25000
                },
                {
                    id: 6,
                    name: "Bánh Macaron Dừa 1 cái",
                    description: "Bánh macaroons dừa làm từ dừa sợi tươi và lòng trắng trứng để làm ra những chiếc bánh dừa rất thơm ngon, ngọt bùi vị dừa.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xCSO_7425.png.pagespeed.ic.VV065-V8Uu.webp",
                    price: 15000
                },
                {
                    id: 7,
                    name: "Bánh Quy Sôcôla",
                    description: "Bánh quy socola có vẻ bề ngoài bắt mắt, vị ngọt vừa phải, thơm mùi bơ, miếng bánh giòn rụm.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xCHOCOLATE-CHIP-COOKIE.png.pagespeed.ic.uwWWvOPUAF.webp",
                    price: 25000
                },
                {
                    id: 8,
                    name: "Bánh Sừng trâu",
                    description: "Bánh sừng bò truyền thống Saint Honoré được làm từ bột mì, bơ và các nguyên liệu chất lượng cao khiến chiếc bánh có kết cấu xốp, giòn và rất thơm mùi bơ.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xcroissant.png.pagespeed.ic.6zQxuJADPM.webp",
                    price: 30000
                }
            ]
            try{
                Cake.forEach((drinkData) => {
                        const drink = doc(db,"Cake",`${drinkData.id}`)
                        console.log(drink)
                        setDoc(drink,drinkData,{merge:true},{capital:true})
                        console.log(drinkData)
                });
            }
            catch(error){
                console.log(error)
            }
            const other = [
                {
                    id: 1,
                    name: "Trà Kem Sữa",
                    description: "Trà kem sữa là một biến thể đặc biệt của trà sữa. Món đồ uống này kết hợp trà với kem cheese tạo nên một hương vị thơm ngon, hấp dẫn, với lớp kem mặn mặn, béo ngậy ở trên cùng.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xCSO_MilkCreamTea_S.png.pagespeed.ic.2vyT1y9qjR.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 59000
                        },
                        {
                            sizeName: "L",
                            price: 79000
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Trà Đào",
                    description: "Trà đào là một loại đồ uống phổ biến được làm từ trà kết hợp với hương vị của quả đào. Trà đào cung cấp một hương vị tươi mát, ngọt ngào, thường được yêu thích trong những ngày hè nóng bức.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food-categories/xCSO_PeachTea_S.png.pagespeed.ic.ogvu68sh4b.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 49000
                        },
                        {
                            sizeName: "L",
                            price: 65000
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Trà Vải",
                    description: "Trà vải là một loại đồ uống ngon miệng và thơm mát, kết hợp hương vị của trà với hương vị ngọt ngào, dịu nhẹ của quả vải.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/xlychee.png.pagespeed.ic.7mFQtDeW11.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 55000
                        },
                        {
                            sizeName: "L",
                            price: 75000
                        }
                    ]
                },
                {
                    id: 4,
                    name: "Tắc muối mơ ngâm hạt chia",
                    description: "Tắc muối mơ ngâm hạt chia là sự hòa trộn hương vị chua của tắc (quýt) và mơ ngâm muối với độ sánh mịn của hạt chia, tạo nên một thức uống giàu dinh dưỡng và lý tưởng cho sức khỏe.",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xtacmuoi.png.pagespeed.ic.fNb8M5_QFX.webp",
                    size: [
                        {
                            sizeName: "M",
                            price: 40000
                        },
                        {
                            sizeName: "L",
                            price: 60000
                        }
                    ]
                },
                {
                    id: 5,
                    name: "Sữa tươi",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/beverage/xmilk_300x300.png.pagespeed.ic.z5vCCo0eOl.webp",
                    price: 25000
                },
                {
                    id: 6,
                    name: "Fanta",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/beverage/xhero-pdt-Fanta-201703_0.png.pagespeed.ic.VTCOuWWJR9.webp",
                    price: 22000
                },
                {
                    id: 7,
                    name: "Nước suối",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/beverage/xdasani_water.png.pagespeed.ic.9dIOxB9nfk.webp",
                    price: 15000
                },
                {
                    id: 8,
                    name: "Sprite",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/beverage/xProduct_thumb_Sprite.png.pagespeed.ic.JeSrsw7hgQ.webp",
                    price: 22000
                },
                {
                    id: 9,
                    name: "Coca-Cola",
                    description: "",
                    imgUrl: "https://mcdonalds.vn/uploads/2018/food/beverage/xmcd-food-beverages-soft-drinks-coke.png.pagespeed.ic.DnHv1b1E6D.webp",
                    price: 22000
                }
            ]
            try{
                other.forEach((drinkData) => {
                        const drink = doc(db,"Other",`${drinkData.id}`)
                        console.log(drink)
                        setDoc(drink,drinkData,{merge:true},{capital:true})
                        console.log(drinkData)
                });
            }
            catch(error){
                console.log(error)
            }
                console.log("Đã thêm các tài liệu thành công!");
                const drinkcold = [
                    {
                        id: 1,
                        name: "Cà phê sữa đá Việt Nam",
                        description: "Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
                        imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xiced_milkVNcoffee.png.pagespeed.ic.c95-PmcQXX.webp",
                        size: [
                          {
                            "sizeName": "M",
                            "price": 35000
                          },
                          {
                            "sizeName": "L",
                            "price": 49000
                          }
                        ]
                      },
                      {
                        id: 2,
                        name: "Cà phê Americano đá",
                        description: "Americano được pha chế bằng cách pha thêm nước với tỷ lệ nhất định vào tách cà phê Espresso, từ đó mang lại hương vị nhẹ nhàng và giữ trọn được mùi hương cà phê đặc trưng.",
                        imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xicedamericano.png.pagespeed.ic.vblLTd6fO3.webp",
                        size: [
                          {
                            "sizeName": "M",
                            "price": 45000
                          },
                          {
                            "sizeName": "L",
                            "price": 65000
                          }
                        ]
                      },
                      {
                        id: 3,
                        name: "Cà phê Latte đá",
                        description: "Một sự kết hợp tinh tế giữa vị đắng cà phê Espresso nguyên chất hòa quyện cùng vị sữa nóng ngọt ngào tạo nên một tách cà phê hoàn hảo về hương vị lẫn nhãn quan.",
                        imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xicedlatte.png.pagespeed.ic.uALe6PqshS.webp",
                        size: [
                          {
                            "sizeName": "M",
                            "price": 55000
                          },
                          {
                            "sizeName": "L",
                            "price": 69000
                          }
                        ]
                      },
                      {
                        id: 4,
                        name: "Cà phê đen đá Việt Nam",
                        description: "Cà phê đen mang trong mình phong vị trầm lắng, thi vị hơn. Người ta thường phải ngồi rất lâu mới cảm nhận được hết hương thơm ngào ngạt, phảng phất mùi cacao và cái đắng mượt mà trôi tuột xuống vòm họng.",
                        imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xiced_VNcoffee.png.pagespeed.ic.pVzI8nKPCq.webp",
                        size: [
                          {
                            "sizeName": "M",
                            "price": 35000
                          },
                          {
                            "sizeName": "L",
                            "price": 59000
                          }
                        ]
                      },
                      {
                        id: 5,
                        name: "Matcha Latte đá",
                        description: "Matcha latte được biến tấu độc đáo từ Coffee latte. Nó được thay thế nguyên liệu cà phê bằng nguyên liệu bột trà xanh có hàm lượng cafein ít hơn cà phê để phục vụ những khách hàng không thích nạp nhiều cafein vào trong cơ thể.",
                        imgUrl: "https://mcdonalds.vn/uploads/2018/mccafe/xicedmatcha.png.pagespeed.ic.sUlJXqIDDo.webp",
                        size: [
                          {
                            "sizeName": "M",
                            "price": 69000
                          },
                          {
                            "sizeName": "L",
                            "price": 99000
                          }
                        ]
                      }
                    ]
                console.log(typeof(drinkDataArray))
                console.log("do")
                drinkcold.forEach((drinkData) => {
                        const drink = doc(db,"coffecold",`${drinkData.id}`)
                        console.log(drink)
                        setDoc(drink,drinkData,{merge:true},{capital:true})
                        console.log(drinkData)
                });
            }

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    // This component doesn't need to return anything
    return null;
}

export default App;
   