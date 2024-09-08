import MenegeMenu from "@/components/MenegeMenu";

export default function ManagePageLayout({ children }) {
    return (<>
                <MenegeMenu>
                    {children}
                </MenegeMenu>
            </>)
}