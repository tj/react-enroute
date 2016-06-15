
include node_modules/react-fatigue-dev/Makefile

test:
	@$(BIN_DIR)/babel-node $(BUILD_FLAGS) test/index.js
.PHONY: test
