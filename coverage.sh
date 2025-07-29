#!/bin/bash

LCOV_FILE="coverage/lcov.info"
MIN_COVERAGE=80

if [ ! -f "$LCOV_FILE" ]; then
  echo "❌ LCOV file not found at $LCOV_FILE. Run tests with coverage first."
  exit 1
fi

# Parse lines found and hit
lines_found=$(grep "^LF:" "$LCOV_FILE" | awk -F: '{sum += $2} END {print sum}')
lines_hit=$(grep "^LH:" "$LCOV_FILE" | awk -F: '{sum += $2} END {print sum}')

# Parse branches found and hit
branches_found=$(grep "^BRF:" "$LCOV_FILE" | awk -F: '{sum += $2} END {print sum}')
branches_hit=$(grep "^BRH:" "$LCOV_FILE" | awk -F: '{sum += $2} END {print sum}')

if [ -z "$lines_found" ] || [ -z "$lines_hit" ]; then
  echo "❌ Could not parse line coverage from lcov file."
  exit 1
fi

if [ -z "$branches_found" ] || [ -z "$branches_hit" ]; then
  # No branch coverage info - treat as zero
  branches_found=0
  branches_hit=0
fi

total_found=$((lines_found + branches_found))
total_hit=$((lines_hit + branches_hit))

if [ "$total_found" -eq 0 ]; then
  echo "❌ No lines or branches found in lcov file. Cannot calculate coverage."
  exit 1
fi

coverage=$(echo "scale=2; ($total_hit * 100) / $total_found" | bc)

echo "📊 Coverage from lcov.info: $coverage%"
echo "📈 Lines: $lines_hit / $lines_found, Branches: $branches_hit / $branches_found"

if (( $(echo "$coverage < $MIN_COVERAGE" | bc -l) )); then
  echo "❌ Coverage is below ${MIN_COVERAGE}%. Commit blocked."
  exit 1
else
  echo "✅ Coverage is above ${MIN_COVERAGE}%. You're good to go!"
  exit 0
fi
