import Header from "@/components/header";

const breadcrumbs = [
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Roles', href: '#'},
    {name: 'List', href: '#'}
]
export default function RolesListPage() {
    return (
       <>
           <Header breadcrumbs={breadcrumbs}/>
           <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

           </div>
       </>
    )
}
