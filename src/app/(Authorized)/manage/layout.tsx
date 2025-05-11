import ManageMenu from '../../../components/MenegeMenu';

export default function ManagePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ManageMenu>{children}</ManageMenu>
    </>
  );
}
