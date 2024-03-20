import {NextRequest, NextResponse} from "next/server";
import path from "node:path";
import * as fs from "fs";

export async function GET(req: NextRequest) {
    const filePath = path.join(process.cwd(), 'public', 'month.json')
    const fileData = fs.readFileSync(filePath, 'utf8')
    const MONTHS = JSON.parse(fileData)
    return NextResponse.json({
        body: MONTHS,
    }, {status: 200})
}