'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const {data : session } = useSession();
  
  
  const updateDocument = async () => {
    try {
      const response = await fetch(`/api/save`, {
        method: "PATCH",
        body: JSON.stringify({
          id: "65073f902f75bbec0b76603b",
          prompt: "updated",
          tag: "bye",
          userId: session?.user.id
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Document updated successfully: ", data);
      console.log("using data: ", data.isSaved);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const getDocument = async ()=> {
      const response = await fetch(`/api/save/${session?.user.id}`);
      const data = await response.json();
      console.log(data);
  }
 // No dependencies as this effect runs once on mount

  return( 
    <div>
      <button
       className="px-20 py-4 bg-black rounded text-white"
       onClick={updateDocument}
      >
        Update Document
      </button>

      {session?.user.id ? 
      (<>
        <button className="px-20 py-4 bg-orange-600 rounded text-white"
         onClick={getDocument}
        >
          Get the Data of this user
        </button>
      </>)
      : 
      (<>
      </>)
      }
    </div>
  )
};

export default Page;
