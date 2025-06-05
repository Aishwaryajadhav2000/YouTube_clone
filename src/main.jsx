import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { RouterProvider } from 'react-router-dom'
import Header from './components/Header.jsx';
import { Provider } from 'react-redux';
import { store } from "./store/store.jsx";
import { SidebarProvider } from './components/MenuContext.jsx';
import LoaderCom from './components/LoaderCom.jsx';
import Dashboard from './components/dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Channel from './pages/channel.jsx';
// import Channel from './pages/Channel.jsx';

const appRouter = createBrowserRouter([
  {
    path : "/", element:<App></App>,

    children:[
      {index : true , element:<Dashboard></Dashboard>},
      {path: "/channel" , element:<Channel></Channel>}
    ]

  },
  {
    path:"/login", element:<Login></Login>
  },
  {
    path:"/register" , element:<Register></Register>
  },
  
])


createRoot(document.getElementById('root')).render(
   <StrictMode>
   <Provider store={store}>
    <SidebarProvider>
      <Suspense fallback={<LoaderCom></LoaderCom>}>
       <RouterProvider router={appRouter}></RouterProvider>
      </Suspense>
    </SidebarProvider>
   </Provider>
  </StrictMode>
)
