/**
 * Copyright (c) 2000-2013 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.image.editor.hook.action;

import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.util.Base64;
import com.liferay.portal.kernel.util.FileUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.theme.ThemeDisplay;

import java.awt.image.BufferedImage;

import java.io.ByteArrayInputStream;
import java.io.File;

import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

import javax.portlet.ActionRequest;

/**
 * @author Roberto Díaz
 */
public class ActionUtil {

	public static String getChangeLog(ActionRequest actionRequest) {
		ThemeDisplay themeDisplay = (ThemeDisplay)actionRequest.getAttribute(
			WebKeys.THEME_DISPLAY);

		return LanguageUtil.get(
			themeDisplay.getLocale(),
			"this-image-has-been-modified-using-web-image-editor");
	}

	public static File getImageFromBlob(String blob, String formatName)
		throws Exception {

		blob = blob.substring(blob.indexOf(StringPool.COMMA) + 1);

		byte[] decodedBytes = Base64.decode(blob);

		ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(
			decodedBytes);

		ImageInputStream imageInputStream = ImageIO.createImageInputStream(
			byteArrayInputStream);

		Iterator<?> readerIterator = ImageIO.getImageReadersByFormatName(
			formatName);

		ImageReader reader = (ImageReader)readerIterator.next();

		reader.setInput(imageInputStream, true);

		ImageReadParam defaultReadParam = reader.getDefaultReadParam();

		BufferedImage bufferedImage = reader.read(0, defaultReadParam);

		File imageFile = FileUtil.createTempFile();

		ImageIO.write(bufferedImage, formatName, imageFile);

		return imageFile;
	}

}