import { Layout } from "~/components/layout";
import PdfList from "~/components/lists/pdfs-list";
import { UserButton, useUser } from "@clerk/remix";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

export default function WorkspacePage() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();

  // Redirect unauthenticated users to home page
  const upsertUser = useMutation(api.user.upsertUser)
  useEffect(() => {
    if(isLoaded && user)
    upsertUser({
      email: user?.emailAddresses?.[0] || '',
      image:  user?.imageUrl || '',
      name: user?.fullName || "",
      clerkId: user?.id

    })
    if (isLoaded && !isSignedIn) {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate]);

  

  // Show nothing while user data is loading
  if (!isLoaded) {
    return null;
  }

  // Render workspace for signed-in users
  if (isSignedIn) {
    return (
      <Layout>
        <div className="flex-1 p-6 pt-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-start">
              <div onClick={() => navigate("/")}>
                <h1 className="text-3xl font-bold mb-2">Workspace</h1>
                <p className="text-muted-foreground">
                  Upload and manage your PDF files
                </p>
              </div>
              <UserButton />
            </div>
            <PdfList />
          </div>
        </div>
      </Layout>
    );
  }

  // Edge case: If somehow reached here, show nothing
  return null;
}
