import { redirect } from "next/navigation"

/**
 * /admin → redirect automático a /admin/dashboard
 */
export default function AdminIndexPage() {
    redirect("/admin/dashboard")
}
