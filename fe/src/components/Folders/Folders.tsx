import { FC } from "react";

const Folders = () => {
  const folders = [
    {
      id: "Tech-abdfade6-a0c2-4149-b674-8f804df6febe",
      name: "Tech",
      notes: [
        {
          key: "Advanced React.js implementations",
          value: "Advanced-React.js-d8d1e725-4e31-4b6d-a3fa-05aca1b2828d",
        },
        {
          key: "Cool JS features",
          value: "Cool-JS-5096475a-0e11-4e45-8380-5304f15a49c3",
        },
        {
          key: "Blogs to read",
          value: "Blogs-to-0f7cf03e-84d0-4480-82a8-f6929c41325d",
        },
        {
          key: "Markdow packages for React Native",
          value: "Markdow-packages-c276180e-3616-4422-a214-b2dee38c68ea",
        },
      ],
    },
  ] as unknown as Folder[];

  const foldersContent = folders.map((folder) => (
    <Folder
      key={folder.id}
      id={folder.id}
      name={folder.name}
      notes={folder.notes}
    />
  ));

  return <>{foldersContent}</>;
};

export default Folders;

const Folder: FC<Folder> = ({ name }) => {
  return <>{name}</>;
};

export const FolderNavList = () => {};
