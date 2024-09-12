import { Grid, Card, CardMedia, Typography, Box } from "@mui/material";

export default function MonsterEncyclopedia() {
  const defaultImage =
    "/images/monsters/encyclopedias/monster_question_mark.jpg";
  const monsters = [
    { id: 1, name: "ドスジャグラス", kills: 0 },
    { id: 2, name: "クルルヤック", kills: 0 },
    { id: 3, name: "アンジャナフ", kills: 0 },
    { id: 4, name: "リオレウス", kills: 0 },
    { id: 5, name: "ディアブロス", kills: 0 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/images/layouts/basic_background.jpg')] bg-repeat bg-auto">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold z-10">
        <p className="text-2xl sm:text-2xl md:text-5xl bg-black bg-opacity-50 p-4 rounded-md mt-2 sm:mb-2">
          モンスター図鑑
        </p>
      </div>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: "16px",
          color: "white",
        }}
      >
        <Grid container spacing={8} sx={{ marginTop: "76px" }}>
          {monsters.map((monster) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={monster.id}>
              <Card className="bg-blue-900 bg-opacity-80 text-white h-full max-w-[300px] mx-auto border-4 border-gray-300 rounded-lg shadow-lg p-4">
                <Typography
                  variant="h6"
                  component="div"
                  className="text-center text-lg font-bold mb-2"
                >
                  {monster.name}
                </Typography>
                <div className="border-b border-gray-400 w-full mb-4" />
                <CardMedia
                  component="img"
                  height="300"
                  image={defaultImage}
                  alt={monster.name}
                  className="rounded-lg mx-auto mb-4 border-2 border-gray-300"
                  style={{
                    width: "100%",
                    maxWidth: "220px",
                    objectFit: "contain",
                  }}
                />
                <Typography
                  variant="body2"
                  className="text-white text-center mb-2"
                >
                  討伐数: {monster.kills}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
