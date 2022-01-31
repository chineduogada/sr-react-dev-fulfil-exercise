import { cleanup } from "../utils/test-utils";

// Mock the fetch call
jest.mock("axios");
afterEach(cleanup);
