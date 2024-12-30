# Retail Pulse Image Processing Service

This is a Node.js-based backend service designed to process images collected from stores. The service handles job submission, processes image URLs, calculates the perimeter of images, and provides job status through RESTful APIs.

## Features
1. **Submit Job**: Allows users to submit jobs with image URLs and store details.
2. **Process Images**: Downloads images, calculates their perimeters, and simulates GPU processing with a random delay.
3. **Get Job Info**: Retrieves the status of a submitted job (completed, ongoing, or failed).

---

## Assumptions
- The `store_id` provided in the job submission must match the predefined store master.
- If any image fails to download or a store ID is invalid, the job status is marked as `failed` with relevant error details.
- Jobs are stored in-memory and will be reset upon server restart.

---

## Setup Instructions

### Prerequisites
- **Node.js**: Version 18.x or higher.

1. Clone the repository:
  git remote add origin https://github.com/Ankit24536/image-processor.git
