import app from "./app";
import { ENV } from "./config/env.config";

app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
});
