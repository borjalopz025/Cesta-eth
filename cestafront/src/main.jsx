import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createContext } from 'react' 
import { QueryClient , QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './componentes/Home'
import { Producto } from './componentes/Producto'
import { Cesta } from './componentes/Cesta'
import { Pro } from './componentes/Pro'

const queryClient = new QueryClient();

export const context = createContext(null);

const AppRouter = () =>{

  const [estado, setEstado] = useState({
    cesta: []
  })

  return (
    <context.Provider value={[estado, setEstado]}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home></Home>}>
              <Route index element={<Producto/>}/>
              <Route path='/producto' element={<Producto></Producto>}/>
              <Route path='/Cesta' element={<Cesta></Cesta>}/>
              <Route path='producto/:id' element={<Pro/>}/>
              <Route path='*' element={<h1>NOT FOUNT</h1>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
