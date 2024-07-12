const Header = () => {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        height: "5rem",
        justifyContent: "space-between",
      }}
    >
      <div>Logo</div>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          paddingTop: "0.5rem",
        }}
      >
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </nav>
  );
};

export default Header;
