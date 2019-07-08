.PHONY: build
build-serve:
	#
	rm -rf build;
	mkdir -p build/packages;
	cp ./tsconfig.prod.json build/tsconfig.json
	cp -f ./package.json build/package.json
	mkdir build/packages/etc;
	cp -rf packages/etc/{package.json,internal} build/packages/etc
	mkdir build/packages/api;
	cp -rf packages/api/{package.json,internal} build/packages/api
	mkdir build/packages/snowflake;
	cp -rf packages/snowflake/{package.json,internal} build/packages/snowflake
	cd ./packages/scripts; yarn post-build;
	cd build; npx tsc;
