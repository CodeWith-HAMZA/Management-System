    // app/routes/api/data.ts
    import { json } from "@remix-run/node";

    export const loader = async () => {
      const data = [
        { id: 1, name: "Document 1" },
        { id: 2, name: "Document 2" },
      ];

      return json(data);  
    };
