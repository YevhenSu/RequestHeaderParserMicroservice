const server = require('express');
const app = server();
const useragent = require('useragent');

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on PORT: `${port}));

app.get('/', (req, res) => {
  const agent = useragent.parse(req.headers['user-agent']);
  const ip = req.headers['x-forwarded-for'];
  if (ip) {
    const list = ip.split(',');
    ip = list[list.length - 1];
  } else {
    ip = req.connection.remoteAddress;
  }
  
  res.json({
    ip,
    "language": req.headers['accept-language'].split(',')[0],
    OS: agent.os.family
  });
});


