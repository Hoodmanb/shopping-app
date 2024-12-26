import DashboardLayoutAccountSidebar from "./components/Drawer.jsx"

export default function AdminLayout({children}) {
  
  return(
    <div>
      <DashboardLayoutAccountSidebar/>
      {children}
    </div>
    )
}