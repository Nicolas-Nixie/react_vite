import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { firestore, auth } from '../firebase/firebase'
import { getDocs,getDoc, collection, doc, updateDoc, query, where } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';

const Profile = () => {
  //const { currentUser, signOut } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  //const [shoes, setShoes] = useState([])
  //const [orderUnits, setOrderUnits] = useState([])
  const [orders, setOrders] = useState<any[]>([])
  const [ordersNb, setOrdersNb] = useState(0)
  const [price30day, setPrice30day] = useState(0)
  const [price60day, setPrice60day] = useState(0)
  const [priceProgress, setPriceProgress] = useState(0)

 const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    const fetchOrder = async () => {
      const orders = await findAll()
      setOrders(orders)
    }   
    fetchOrder()
    findOrderProgress()
    findPriceProgress()
  }, [])
  

  const findOrderProgress = async () => {

    const order30days = await getOrder30ago()
    const order60days = await getOrder60ago()
    const ordersNb :number = order30days.length - order60days.length
    setOrdersNb(ordersNb)
     
  }

  const findPriceProgress = () => {
    findPriceProgress30days()
    findPriceProgress60days()
    console.log(price30day)
    console.log(price60day)
    //setPriceProgress(price30day - price60day)
  }

  const findPriceProgress30days = async () => {
    const order30days = await getOrder30ago()
    order30days.forEach(async (element: { id: string; }) => {
        const order = await findOrder(element.id)
        //console.log(order)
        if(order){
            order.shoes.forEach(async (element2: { id: string; }) => {
                const orderUnit = await findOrderUnit(element2.id)
                if(orderUnit){
                    //console.log("orderUnit",orderUnit.shoes.shoeReference)
                    const shoe = await findShoe(orderUnit.shoes.shoeReference.id)
                    if(shoe){
                        const price = shoe.price * orderUnit.shoes.amount
                        setPrice30day(price30day => price30day + price)
                    }
                }      
            });
        }
    });
  }

  const findPriceProgress60days = async () => {
    const order60days = await getOrder60ago()
    order60days.forEach(async (element: { id: string; }) => {
        const order = await findOrder(element.id)
        if(order){
            order.shoes.forEach(async (element2: { id: string; }) => {
                const orderUnit = await findOrderUnit(element2.id)
                if(orderUnit){
                    const shoe = await findShoe(orderUnit.shoes.shoeReference.id)
                    if(shoe){
                        const price = shoe.price * orderUnit.shoes.amount
                        setPrice60day(price60day => price60day + price)
                    }
                }      
            });
        }
    });
  }




    const getOrder30ago = async () => {
        var today = new Date();
        var date30ago = new Date(new Date().setDate(today.getDate() - 30));

        const f = query(collection(firestore, "order"), where("dateTime", ">=", date30ago))
        const querySnapshot2 = await getDocs(f);
        const result = querySnapshot2.docs
        //console.log("new : ",result.length)
        return result
    }

    const getOrder60ago = async () => {
        var today = new Date();
        var date30ago = new Date(new Date().setDate(today.getDate() - 30));
        var date60ago = new Date(new Date().setDate(today.getDate() - 60));

        const q = query(collection(firestore, "order"), where("dateTime", "<=", date30ago), where("dateTime", ">=", date60ago))
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs
        //console.log("old : ",result.length)
        return result
    }

    //charger les données de la collection shoes
  const findShoe = async (id: string) => {
    const doc_ref = await getDoc(doc(firestore, 'shoes', id))
    return doc_ref.data()
  }

  const findOrderUnit = async (id: string) => {
    const doc_ref = await getDoc(doc(firestore, 'orderUnit', id))
    return doc_ref.data()
  }

  const findOrder = async (id: string) => {
    const doc_ref = await getDoc(doc(firestore, 'order', id))
    return doc_ref.data()
  }

  //charger les données de la collection shoes
  const findAll = async () => {
    const doc_refs = await getDocs(collection(firestore, "order"))
    const res: { id: string; }[] = []
    doc_refs.forEach(order => {
        res.push({
            id: order.id,
            ...order.data()
        }) 
    })
    return res
  }

  //switch pour afficher les bon icones en fonction de l'état de la commande
  const renderSwitch = (param : string) => {
    switch(param) {
      case 'pending':
        return <svg className="h-8 w-8 text-orange-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />  <line x1="16" y1="8" x2="2" y2="22" />  <line x1="17.5" y1="15" x2="9" y2="15" /></svg>;
      case 'valid':
        return <svg className="h-8 w-8 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
      case 'reject':
        return <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>;
      default:
        return 'foo';
    }
  }

  //valide une commande, change le status de la commande en "valid"
const validate = async (id: string) => {
    const ordertest = doc(firestore, "order", id);
    await updateDoc(ordertest, {
        status: "valid"
      });
    const orders = await findAll()
    setOrders(orders)
}
  //reject une commande, change le status de la commande en "reject"
const reject = async (id: string) => {
    const ordertest = doc(firestore, "order", id);
    await updateDoc(ordertest, {
        status: "reject"
      });
    const orders = await findAll()
    setOrders(orders)
}
  //console.log(orders)
  return(
    
        <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
          <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 px-2">
              <Menu />
              <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">  
                  <div id="24h">
                      <h1 className="font-bold py-4 uppercase">Last 24h Statistics</h1>
                      <div id="stats" className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                              <div className="flex flex-row space-x-4 items-center">
                                  <div id="stats-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                  </div>
                                  <div>
                                      <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Users</p>
                                      <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                          <span>+28</span>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                                </svg>
                                                
                                          </span>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div className="bg-black/60 p-6 rounded-lg">
                              <div className="flex flex-row space-x-4 items-center">
                                  <div id="stats-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        
                                  </div>
                                  <div>
                                      <p className="text-teal-300 text-sm font-medium uppercase leading-4">Income</p>
                                      <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                          <span>{price30day - price60day}</span>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                                </svg>
                                                
                                          </span>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div className="bg-black/60 p-6 rounded-lg">
                              <div className="flex flex-row space-x-4 items-center">
                                  <div id="stats-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        
                                  </div>
                                  <div>
                                      <p className="text-blue-300 text-sm font-medium uppercase leading-4">Invoices</p>
                                      <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                          <span>{ordersNb}</span>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                                </svg>
                                          </span>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div id="list-command">
                      <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
                      <div className="">
                          <table className="w-full whitespace-nowrap">
                              <thead className="bg-black/60">
                                <tr>
                                  <th className="text-left py-3 px-2">Email</th>
                                  <th className="text-left py-3 px-2">iD Order</th>
                                  <th className="text-left py-3 px-2">Status</th>
                                  <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                              {orders.map((order) =>
                                <tr className="border-b border-gray-700" key={order.id}>
                                  <td className="py-3 px-2">{order.email}</td>
                                  <td className="py-3 px-2">{order.id}</td>
                                  <td className="py-3 px-2">{renderSwitch(order.status)}</td>
                                  <td className="py-3 px-2">
                                      <div className="inline-flex items-center space-x-3">
                                        <Link to={'/OrderView/' + order.id} >
                                          <svg className="h-8 w-8 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                          </svg>
                                        </Link>
                                          <div title="Valider" className="hover:text-white" onClick={() => validate(order.id)}>
                                            <svg className="h-8 w-8 text-green-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
                                              <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                          </div>
                                          <div title="Refuser" className="hover:text-white" onClick={() => reject(order.id)}>
                                            <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
                                              <circle cx="12" cy="12" r="10" />
                                              <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" />
                                            </svg>
                                          </div>
                                      </div>
                                  </td>
                                </tr>
                              )}
                              </tbody>
                                 
                          </table>
                      </div>
                  </div>
                
              </div>
          </div>
        </div>
  )
}
export default Profile