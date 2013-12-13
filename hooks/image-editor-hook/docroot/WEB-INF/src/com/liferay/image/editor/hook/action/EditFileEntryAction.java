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

import com.liferay.portal.NoSuchImageException;
import com.liferay.portal.kernel.repository.model.FileEntry;
import com.liferay.portal.kernel.repository.model.FileVersion;
import com.liferay.portal.kernel.servlet.SessionErrors;
import com.liferay.portal.kernel.struts.BaseStrutsPortletAction;
import com.liferay.portal.kernel.struts.StrutsPortletAction;
import com.liferay.portal.kernel.util.Constants;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.TempFileUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.service.ServiceContext;
import com.liferay.portal.service.ServiceContextFactory;
import com.liferay.portlet.assetpublisher.util.AssetPublisherUtil;
import com.liferay.portlet.documentlibrary.NoSuchFileEntryException;
import com.liferay.portlet.documentlibrary.model.DLFileEntry;
import com.liferay.portlet.documentlibrary.service.DLAppServiceUtil;

import java.io.File;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;

/**
 * @author Roberto Díaz
 */
public class EditFileEntryAction extends BaseStrutsPortletAction {

	@Override
	public void processAction(
			StrutsPortletAction originalStrutsPortletAction,
			PortletConfig portletConfig, ActionRequest actionRequest,
			ActionResponse actionResponse)
		throws Exception {

		String cmd = ParamUtil.getString(actionRequest, Constants.CMD);

		try {
			if (cmd.equals(Constants.EDIT)) {
				updateImage(actionRequest);
			}
			else {
				originalStrutsPortletAction.processAction(
					originalStrutsPortletAction, portletConfig, actionRequest,
					actionResponse);
			}
		}
		catch (Exception e) {
			SessionErrors.add(actionRequest, e.getClass());
		}
		finally {
			String redirect = ParamUtil.getString(actionRequest, "redirect");

			actionResponse.sendRedirect(redirect);
		}
	}

	protected void updateImage(ActionRequest actionRequest) throws Exception {
		long fileEntryId = ParamUtil.getLong(actionRequest, "fileEntryId");

		if (fileEntryId == 0) {
			throw new NoSuchFileEntryException();
		}

		FileEntry fileEntry = DLAppServiceUtil.getFileEntry(fileEntryId);

		String blob = ParamUtil.getString(actionRequest, "blob");

		if (Validator.isNull(blob)) {
			throw new NoSuchImageException();
		}

		String mimeType = fileEntry.getMimeType();

		FileVersion latestFileVersion = fileEntry.getLatestFileVersion();

		String extension = latestFileVersion.getExtension();

		File imageFile = ActionUtil.getImageFromBlob(blob, extension);

		FileEntry tempFileEntry = TempFileUtil.addTempFile(
			fileEntry.getGroupId(), fileEntry.getUserId(),
			fileEntry.getTitle() + fileEntry.getVersion(), _TEMP_FOLDER_NAME,
			imageFile, mimeType);

		try {
			ServiceContext serviceContext = ServiceContextFactory.getInstance(
				actionRequest);

			String oldTitle = fileEntry.getTitle();

			fileEntry = DLAppServiceUtil.updateFileEntry(
				fileEntryId, null, mimeType, oldTitle.concat(extension),
				fileEntry.getDescription(),
				ActionUtil.getChangeLog(actionRequest), false, imageFile,
				serviceContext);

			AssetPublisherUtil.addAndStoreSelection(
				actionRequest, DLFileEntry.class.getName(),
				fileEntry.getFileEntryId(), -1);

			AssetPublisherUtil.addRecentFolderId(
				actionRequest, DLFileEntry.class.getName(),
				fileEntry.getFolderId());

			return;
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if (tempFileEntry != null) {
				TempFileUtil.deleteTempFile(tempFileEntry.getFileEntryId());
			}
		}
	}

	private static final String _TEMP_FOLDER_NAME =
		EditFileEntryAction.class.getName();

}